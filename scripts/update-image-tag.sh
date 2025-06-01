#!/bin/bash
set -e
application_name=$1
path=$2
image_tag=$3

terminate() {
    message=$1
    exit_code=${2:-150}
    echo "${message}"
    exit ${exit_code}
}

usage() {
    cat <<EOF
    Usage: $0 <application_name> <path> <image_tag>
    Example: $0 frontend production ghcr.io/monospaced-stack/monospaced-stack/frontend:latest
EOF
}

if [ -z "$application_name" ] || [ -z "$image_tag" ]; then
    usage
    exit 1
fi

echo "Updating image tag for $application_name to $image_tag"

configure_git() {
    git config --global user.email "github-actions[bot]@users.noreply.github.com"
    git config --global user.name "github-actions[bot]"
}

clone_repo_and_checkout_branch() {
    echo "Cloning k8s-apps repository..."
    git clone git@github.com:rohitpotato/k8s-apps.git
    cd k8s-apps
    git checkout main
    git pull
    echo "Repository cloned and updated successfully"
}

update_image_tag() {
    local target_dir="${path}"
    local target_file="deployment.yaml"
    
    echo "Navigating to directory: $target_dir"
    cd "$target_dir" || terminate "Failed to navigate to directory: $target_dir"
    
    echo "Checking if file exists: $target_file"
    if [ ! -f "$target_file" ]; then
        terminate "File not found: $target_file"
    fi
    
    echo "Current image configuration:"
    grep "image:" "$target_file" || echo "No image lines found"
    
    echo "Updating image tag..."
    # Simple approach: replace any line with "image: " followed by anything
    if sed -i "s|image: .*|image: $image_tag|g" "$target_file"; then
        echo "Image tag updated successfully"
    else
        terminate "Failed to update image tag"
    fi
    
    echo "New image configuration:"
    grep "image:" "$target_file"
    
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