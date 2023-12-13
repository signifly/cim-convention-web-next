import { CtaButtonRecord } from '@/types/generated'
import React from 'react'
import { StyledLink, StyledLinkExternal } from './StyledLink'

export const CtaButton = (props: CtaButtonRecord) => {
  const { label, useExternalLink, linkTo, externalLink, id, stylingOption } =
    props

  if (!useExternalLink && linkTo) {
    return (
      <StyledLink
        key={id}
        href={{
          pathname: '/[...slug]',
          params: { slug: [linkTo.slug] },
        }}
        variant={stylingOption as 'primary' | 'secondary'}
      >
        {label}
      </StyledLink>
    )
  }

  if (useExternalLink && externalLink !== '') {
    return (
      <StyledLinkExternal
        key={id}
        href={externalLink as string}
        variant={stylingOption as 'primary' | 'secondary'}
      >
        {label}
      </StyledLinkExternal>
    )
  }
}