'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { cn } from '@/lib/utils'

export function CopyCodeButton({ code, className }: { code: string, className?: string }) {
  const [, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  async function onClick() {
    if (await copy(code)) {
      setCopied(true)
      setTimeout(setCopied, 1400, false)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-divider-strong px-2 py-1 font-mono text-[11px] text-inkMuted transition-colors hover:text-ink',
        copied && 'text-ok hover:text-ok',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="inline-flex"
        >
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
