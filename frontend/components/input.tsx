import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent',
        'placeholder:text-gray-500',
        className,
      )}
      {...props}
    />
  )
}

export default Input
