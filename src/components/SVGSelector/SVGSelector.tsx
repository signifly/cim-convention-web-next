import React, { HTMLAttributes } from 'react'
import FacebookIcon from './SVGs/FacebookIcon'
import InstagramIcon from './SVGs/InstagramIcon'
import LinkedinIcon from './SVGs/LinkedinIcon'
import TwitterIcon from './SVGs/TwitterIcon'
import YoutubeIcon from './SVGs/YoutubeIcon'

const SVGMap = {
  facebook_icon: FacebookIcon,
  instagram_icon: InstagramIcon,
  linkedin_icon: LinkedinIcon,
  twitter_icon: TwitterIcon,
  youtube_icon: YoutubeIcon,
}

const SVGSelector = ({
  selectorId,
  ...rest
}: { selectorId: string } & HTMLAttributes<HTMLElement>) => {
  const SVG = SVGMap[selectorId as keyof typeof SVGMap]

  return SVG ? <SVG {...rest} /> : null
}

export default SVGSelector
