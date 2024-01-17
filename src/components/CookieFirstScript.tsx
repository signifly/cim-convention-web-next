'use client'
import React, { useEffect } from 'react'
import Script from 'next/script'

const CookieFirstScript = () => {
  const reloadWidget = () => {
    const cookiePolicyContainer = document.getElementById(
      'cookiefirst-policy-page',
    )
    const head = document.querySelector('head')
    const cookieFirstScript = document.getElementById('cookiefirst-script')

    if (!cookiePolicyContainer || !head || !cookieFirstScript) return
    head?.removeChild(cookieFirstScript)
    head.innerHTML += `<script id="cookiefirst-script" src="https://consent.cookiefirst.com/sites/convention.cim.org-${process.env.NEXT_PUBLIC_COOKIE_FIRST_API_KEY}/consent.js" defer></script>`
  }

  useEffect(reloadWidget, [])

  return (
    <Script
      id="cookiefirst-script"
      src={`https://consent.cookiefirst.com/sites/convention.cim.org-${process.env.NEXT_PUBLIC_COOKIE_FIRST_API_KEY}/consent.js`}
    />
  )
}

export default CookieFirstScript
