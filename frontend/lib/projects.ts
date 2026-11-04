// Public repositories worth showing, newest work first within each group.
// Descriptions are written for readers, not copied from GitHub.

export interface Project {
  name: string
  repo: string
  description: string
  stack: string
}

export const PROJECT_GROUPS: { title: string, projects: Project[] }[] = [
  {
    title: 'Infrastructure and observability',
    projects: [
      {
        name: 'k8s-apps',
        repo: 'rohitpotato/k8s-apps',
        description: 'The GitOps repo behind my homelab cluster: every app, alert and RBAC rule this site runs on, synced by Argo CD.',
        stack: 'Kubernetes · Argo CD',
      },
      {
        name: 'PromQL Playground',
        repo: 'rohitpotato/promql-playground',
        description: 'Learn PromQL through scenarios: realistic metrics, a question, and a query to write.',
        stack: 'TypeScript',
      },
      {
        name: 'nginx log exporter dashboard',
        repo: 'rohitpotato/nginx-prometheus-log-exporter-grafana-dashboard',
        description: 'A Grafana dashboard for metrics derived from nginx access logs by prometheus-nginxlog-exporter.',
        stack: 'Grafana · Prometheus',
      },
      {
        name: 'VPS hardening checklist',
        repo: 'rohitpotato/ansible-vps-hardening-checklist',
        description: 'An Ansible playbook that hardens a fresh VPS and sets up basic observability.',
        stack: 'Ansible',
      },
      {
        name: 'node-http-server',
        repo: 'rohitpotato/node-http-server',
        description: 'An HTTP server built on Node\'s raw net sockets, to see what frameworks do for you.',
        stack: 'TypeScript · Node.js',
      },
    ],
  },
  {
    title: 'Frontend',
    projects: [
      {
        name: 'svelte-command-palette',
        repo: 'rohitpotato/svelte-command-palette',
        description: 'A dead simple, accessible command palette for Svelte apps.',
        stack: 'Svelte',
      },
      {
        name: 'svelte-switcher',
        repo: 'rohitpotato/svelte-switcher',
        description: 'An accessible, customisable, mobile-friendly toggle component for Svelte.',
        stack: 'Svelte',
      },
      {
        name: 'Spotify unbiased shuffle',
        repo: 'rohitpotato/spotify-unbiased-shuffle',
        description: 'Combine several Spotify playlists and shuffle them properly.',
        stack: 'JavaScript',
      },
      {
        name: 'Implementing React hooks',
        repo: 'rohitpotato/implement-react-hooks',
        description: 'A simplified implementation of useState and useEffect, written to explain how they work.',
        stack: 'JavaScript',
      },
    ],
  },
]
