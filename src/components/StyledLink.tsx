import React, { ComponentProps } from 'react'
import { Link, pathnames } from '@/navigation'
import { cn } from '@/utils/clsxMerge'

export function StyledLink<Pathname extends keyof typeof pathnames>(
  props: ComponentProps<typeof Link<Pathname>>,
) {
  const { href, className, children, ...rest } = props
  const defaultStyle =
    'py-[10px] px-6 text-white rounded-[4px] bg-brand-gradient font-[500] shadow-xs'
  const style = cn(defaultStyle, className)

  return (
    <Link href={href} className={style} {...rest}>
      {children}
    </Link>
  )
}
