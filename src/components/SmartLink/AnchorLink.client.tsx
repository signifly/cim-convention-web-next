'use client'
import React, { ComponentPropsWithoutRef } from 'react'
import { usePathname } from '@/navigation'

type AnchorLinkProps = ComponentPropsWithoutRef<'a'>

export const AnchorLink = (props: AnchorLinkProps) => {
  const { href, children, ...rest } = props
  const pathname = usePathname()

  return (
    <a href={`/${pathname}${href}`} {...rest}>
      {children}
    </a>
  )
}
