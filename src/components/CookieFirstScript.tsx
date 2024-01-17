'use client'
import React, { useEffect } from 'react'
import Script from 'next/script'

const CookieFirstScript = () => {
  const reloadWidget = () => {
    const cookiePolicyContainer = document.getElementById(
      'cookiefirst-policy-page',
    )
    const head = document.querySelector('head')
    const body = document.querySelector('body')
    const cookieFirstScript = document.getElementById('cookiefirst-script')
    const newScript = document
      .createElement('script')
      .setAttribute('id', 'cookiefirst-script')
      .setAttribute(
        'src',
        `https://consent.cookiefirst.com/sites/convention.cim.org-${process.env.NEXT_PUBLIC_COOKIE_FIRST_API_KEY}/consent.js`,
      )

    if (!cookiePolicyContainer || !head || !cookieFirstScript) return
    try {
      head.removeChild(cookieFirstScript)
      body.appendChild(newScript)
    } catch (err) {
      console.error(err)
      return
    }
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
