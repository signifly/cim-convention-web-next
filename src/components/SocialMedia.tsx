import React, { HTMLAttributes } from 'react'
import SVGSelector from './SVGSelector/SVGSelector'

type SocialMedia = {
  socialMediaName: string
  socialMediaURL: string
}

const SocialMedia = (socialMedia: SocialMedia) => {
  let { socialMediaName, socialMediaURL } = socialMedia

  return (
    <a href={socialMediaURL} target="_blank">
      <SVGSelector
        selectorId={`${socialMediaName}_icon`}
        className="aspect-square h-[20px] w-[20px]"
      />
    </a>
  )
}

export default SocialMedia
