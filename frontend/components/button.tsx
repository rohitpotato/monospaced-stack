import React from 'react'
import { colors } from '../app/__new/theme'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, className = '', disabled, ...props }) => {
  const baseClasses = `px-6 py-2 text-lg bg-${colors.background} border-2 border-${colors.border} text-${colors.tertiary}`
  const interactiveClasses = `hover:bg-${colors.tertiary} hover:text-${colors.black} active:bg-green-300`
  const disabledClasses = `disabled:bg-${colors.gray[800]} disabled:text-${colors.gray[500]} disabled:cursor-wait`

  return (
    <button
      className={`${baseClasses} ${interactiveClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
