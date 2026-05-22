import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface Props {
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'
  children: ReactNode
  className?: string
}

export function Badge({ color = 'blue', children, className }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-blue-100 text-blue-700': color === 'blue',
          'bg-green-100 text-green-700': color === 'green',
          'bg-yellow-100 text-yellow-700': color === 'yellow',
          'bg-red-100 text-red-700': color === 'red',
          'bg-gray-100 text-gray-600': color === 'gray',
          'bg-purple-100 text-purple-700': color === 'purple',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
