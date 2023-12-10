import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/utils/clsxMerge'

type ContainerProps = { children: ReactNode } & ComponentPropsWithoutRef<'div'>

export const Container = (props: ContainerProps) => {
  const { className, children, ...rest } = props

  return (
    <div
      className={cn(
        'container mx-auto grid grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-8',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
