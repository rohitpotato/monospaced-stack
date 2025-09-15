import React from 'react'
import { colors } from '../app/__new/theme'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const baseClasses = `flex-grow p-2 text-lg bg-${colors.background} border-2 border-${colors.border} text-${colors.primary}`
  const focusClasses = `focus:outline-none focus:bg-${colors.gray[900]}`

  return (
    <input
      className={`${baseClasses} ${focusClasses} ${className}`}
      {...props}
    />
  )
}

export default Input
