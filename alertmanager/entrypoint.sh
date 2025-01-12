#!/bin/sh
set -e

# Read secrets from Docker secrets
SMTP_USER=$(cat /run/secrets/alertmanager_smtp_user)
SMTP_PASSWORD=$(cat /run/secrets/alertmanager_smtp_password)

echo "Running Alertmanager entrypoint script..."

# Replace placeholders in the configuration template
envsubst <<EOF > /etc/alertmanager/config.yml
global:
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'muzicluver603@gmail.com'
  smtp_auth_username: '${SMTP_USER}'
  smtp_auth_password: '${SMTP_PASSWORD}'
  resolve_timeout: 5m

route:
  receiver: 'email'
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 12h

receivers:
  - name: 'email'
    email_configs:
      - to: 'rohit.mmm1996@gmail.com'

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'cluster', 'service']
EOF

# Start Alertmanager
exec "$@"
