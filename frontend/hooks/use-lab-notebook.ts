'use client'

import useSWR from 'swr'
import { LAB_NOTEBOOK, REPO } from '@/components/homelab/homelab-content'

export interface NotebookEntry {
  date: string
  note: string
  url?: string
}

interface GitHubCommit {
  html_url: string
  commit: { message: string, author: { date: string } }
}

// Bot commits from CI that only bump image tags aren't interesting to read.
const NOISE = /^(?:update image tag|bump|chore\(deps\))/i

/** Turns "fix(gateway): redirect http:// and www" into "Redirect http:// and www". */
function toNote(message: string): string | null {
  const lines = message.split('\n').map(l => l.trim()).filter(Boolean)
  // Merge commits carry the PR title on the line after "Merge pull request #n".
  const subject = /^merge pull request/i.test(lines[0] ?? '') ? lines[1] : lines[0]
  if (!subject || NOISE.test(subject) || /^merge /i.test(subject))
    return null
  const text = subject.replace(/^\w+(?:\([^)]*\))?!?:\s*/, '')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

async function fetchNotebook(url: string): Promise<NotebookEntry[]> {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  if (!res.ok)
    throw new Error(`GitHub ${res.status}`)
  const commits = (await res.json()) as GitHubCommit[]
  const seen = new Set<string>()
  const entries: NotebookEntry[] = []
  for (const c of commits) {
    const note = toNote(c.commit.message)
    if (!note || seen.has(note))
      continue
    seen.add(note)
    entries.push({ date: c.commit.author.date.slice(0, 10), note, url: c.html_url })
  }
  return entries.slice(0, 8)
}

/** Recent changes to the GitOps repo, read live from GitHub; falls back to the static notebook. */
export function useLabNotebook() {
  const { data, error } = useSWR(
    `https://api.github.com/repos/${REPO}/commits?per_page=50`,
    fetchNotebook,
    { revalidateOnFocus: false, dedupingInterval: 10 * 60_000, shouldRetryOnError: false },
  )
  const live = !error && !!data?.length
  return { entries: (live ? data! : LAB_NOTEBOOK) as NotebookEntry[], live }
}
