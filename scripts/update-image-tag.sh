#!/bin/bash
set -e
application_name=$1
path=$2
image_tag=$3
container_name=$4

terminate() {
    message=$1
    exit_code=${2:-150}
    echo "${message}"
    exit ${exit_code}
}

usage() {
    cat <<EOF
    Usage: $0 <application_name> <path> <image_tag> [container_name]
    Example (single container): $0 frontend production ghcr.io/monospaced-stack/monospaced-stack/frontend:latest
    Example (multi container):  $0 frontend production ghcr.io/monospaced-stack/monospaced-stack/frontend:latest frontend
EOF
}

if [ -z "$application_name" ] || [ -z "$path" ] || [ -z "$image_tag" ]; then
    usage
    exit 1
fi

echo "Updating image tag for $application_name to $image_tag"

configure_git() {
    git config --global user.email "github-actions[bot]@users.noreply.github.com"
    git config --global user.name "github-actions[bot]"
}

clone_repo_and_checkout_branch() {

    if [[ -d "k8s-apps" ]]; then
        git pull
    else
        echo "Cloning k8s-apps repository..."
        git clone git@github.com:rohitpotato/k8s-apps.git
        cd k8s-apps
        git checkout main
        git pull
        echo "Repository cloned and updated successfully"
    fi
}

update_image_tag() {
    local target_dir="${path}"
    local target_file="deployment.yaml"
    local selected_container="${container_name}"
    
    echo "Navigating to directory: $target_dir"
    cd "$target_dir" || terminate "Failed to navigate to directory: $target_dir"
    
    echo "Checking if file exists: $target_file"
    if [ ! -f "$target_file" ]; then
        target_file="rollout.yaml"
        echo "File not found: $target_file, checking for rollout.yaml"
        if [ ! -f "$target_file" ]; then
            terminate "File not found: $target_file"
        fi
    fi
    
    echo "Current image configuration:"
    awk '/image:[[:space:]]/ { print }' "$target_file" || echo "No image lines found"

    mapfile -t container_names < <(awk '
      function indent_level(s) {
        match(s, /^[ ]*/)
        return RLENGTH
      }

      /^[[:space:]]*containers:[[:space:]]*$/ {
        in_containers = 1
        containers_indent = indent_level($0)
        next
      }

      in_containers && indent_level($0) <= containers_indent && $0 !~ /^[[:space:]]*$/ && $0 !~ /^[[:space:]]*#/ {
        in_containers = 0
      }

      in_containers && match($0, /^[[:space:]]*-[[:space:]]*name:[[:space:]]*["'\'']?([^"'\''[:space:]]+)["'\'']?[[:space:]]*$/, m) {
        print m[1]
      }
    ' "$target_file")

    if [ ${#container_names[@]} -eq 0 ]; then
        terminate "No containers found under spec.template.spec.containers in $target_file"
    fi

    if [ -z "$selected_container" ]; then
        if [ ${#container_names[@]} -eq 1 ]; then
            selected_container="${container_names[0]}"
            echo "Single container detected, targeting: ${selected_container}"
        else
            terminate "Multiple containers detected (${container_names[*]}). Pass container_name as 4th argument."
        fi
    fi

    local container_found=0
    for c in "${container_names[@]}"; do
        if [ "$c" = "$selected_container" ]; then
            container_found=1
            break
        fi
    done
    if [ "$container_found" -ne 1 ]; then
        terminate "Container '$selected_container' not found. Available: ${container_names[*]}"
    fi
    
    echo "Updating image tag for container '$selected_container'..."
    local tmp_file
    tmp_file="$(mktemp)"

    if awk -v target="$selected_container" -v new_image="$image_tag" '
      function indent_level(s) {
        match(s, /^[ ]*/)
        return RLENGTH
      }

      BEGIN {
        in_containers = 0
        containers_indent = -1
        current_container = ""
        updated = 0
      }

      {
        line = $0

        if ($0 ~ /^[[:space:]]*containers:[[:space:]]*$/) {
          in_containers = 1
          containers_indent = indent_level($0)
          current_container = ""
          print line
          next
        }

        if (in_containers && indent_level($0) <= containers_indent && $0 !~ /^[[:space:]]*$/ && $0 !~ /^[[:space:]]*#/) {
          in_containers = 0
          current_container = ""
        }

        if (in_containers && match($0, /^[[:space:]]*-[[:space:]]*name:[[:space:]]*["'\'']?([^"'\''[:space:]]+)["'\'']?[[:space:]]*$/, m)) {
          current_container = m[1]
        }

        if (in_containers && current_container == target && $0 ~ /^[[:space:]]*image:[[:space:]]*/) {
          sub(/image:[[:space:]]*.*/, "image: " new_image, line)
          updated = 1
        }

        print line
      }

      END {
        if (updated == 0) {
          exit 42
        }
      }
    ' "$target_file" > "$tmp_file"; then
        mv "$tmp_file" "$target_file"
        echo "Image tag updated successfully"
    else
        rm -f "$tmp_file"
        terminate "Failed to update image for container '$selected_container'"
    fi
    
    echo "New image configuration:"
    awk '/image:[[:space:]]/ { print }' "$target_file"
    
    # Check if any changes were made
    if git diff --quiet; then
        echo "No changes detected. Image might already be up to date."
        return 0
    fi
    
    echo "Committing changes..."
    git add "$target_file"
    git commit -m "Update image tag for ${application_name} to $image_tag"
    
    echo "Pushing changes..."
    git push || terminate "Failed to push changes"
    
    echo "Successfully updated and pushed image tag for $application_name"

    echo "Cleaning up..."
    cd ..
    rm -rf k8s-apps
}

configure_git
clone_repo_and_checkout_branch
update_image_tag