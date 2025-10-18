import React from 'react'
import { cn } from '@/lib/utils'

interface WindowProps {
  title?: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

const Window: React.FC<WindowProps> = ({ title, children, className = '', onClose }) => {
  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg shadow-sm', className)}>
      {title && (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 flex items-center justify-center rounded transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className="p-4 max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default Window
