import React, { HTMLAttributes } from 'react'
import FacebookIcon from './Icons/FacebookIcon'
import InstagramIcon from './Icons/InstagramIcon'
import LinkedinIcon from './Icons/LinkedinIcon'
import XIcon from './Icons/XIcon'
import YoutubeIcon from './Icons/YoutubeIcon'

const SVGMap = {
  facebook_icon: FacebookIcon,
  instagram_icon: InstagramIcon,
  linkedin_icon: LinkedinIcon,
  twitter_icon: XIcon,
  youtube_icon: YoutubeIcon,
}

const IconSelector = ({
  selectorId,
  ...rest
}: { selectorId: string } & HTMLAttributes<HTMLElement>) => {
  const SVG = SVGMap[selectorId as keyof typeof SVGMap]

  return SVG ? <SVG {...rest} /> : null
}

export default IconSelector
