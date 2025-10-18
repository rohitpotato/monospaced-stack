import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', disabled, ...props }) => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200'

  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400',
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
