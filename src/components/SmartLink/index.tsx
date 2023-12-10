import React, { ComponentProps } from 'react'
import { Link, pathnames } from '@/navigation'
import { cn } from '@/utils/clsxMerge'
import { AnchorLink } from './AnchorLink.client'

export function SmartLink<Pathname extends keyof typeof pathnames>(
  props: ComponentProps<typeof Link<Pathname>>,
) {
  const { href, className, children, ...rest } = props
  const style = cn(className)

  if (typeof href === 'string' && href.startsWith('#')) {
    return (
      <AnchorLink href={href} className={style} {...rest}>
        {children}
      </AnchorLink>
    )
  }

  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <a
        href={href}
        className={style}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={style} {...rest}>
      {children}
    </Link>
  )
}
