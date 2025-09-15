import React from 'react'
import { colors } from '../app/__new/theme'
import Typography from './typography'

interface WindowProps {
  title?: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

const Window: React.FC<WindowProps> = ({ title, children, className = '', onClose }) => {
  return (
    <div className={`bg-${colors.background} border-2 border-${colors.border} p-1 shadow-[0_0_15px_rgba(50,255,50,0.5)] ${className}`}>
      <div className="text-green-500 flex justify-between items-center p-1 select-none">
        {title && <Typography as="h2" variant="h5" color="tertiary">{title}</Typography>}
        {onClose && (
          <button onClick={onClose} className={`w-6 h-6 bg-${colors.background} border border-${colors.border} text-${colors.tertiary} flex items-center justify-center font-bold hover:bg-${colors.tertiary} hover:text-${colors.black}`} aria-label="Close">
            X
          </button>
        )}
      </div>
      <div className={`p-4 max-h-[80vh] overflow-y-auto bg-${colors.background}`}>
        {children}
      </div>
    </div>
  )
}

export default Window
