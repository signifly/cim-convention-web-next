'use client'
import React, { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

const CookieFirstScript = () => {
  const pathname = usePathname()

  const reloadWidget = () => {
    const cookiePolicyContainer = document.getElementById(
      'cookiefirst-policy-page',
    )
    const head = document.querySelector('head')
    const body = document.querySelector('body')
    const cookieFirstScript = document.getElementById('cookiefirst-script')

    if (!cookiePolicyContainer || !head || !cookieFirstScript || !body) return

    try {
      head.removeChild(cookieFirstScript)
      const newScript = document.createElement('script')
      newScript.id = 'cookiefirst-script'
      newScript.src = `https://consent.cookiefirst.com/sites/convention.cim.org-${process.env.NEXT_PUBLIC_COOKIE_FIRST_API_KEY}/consent.js`
      body.appendChild(newScript)
    } catch (err) {
      console.error(err)
      return
    }
  }

  useEffect(reloadWidget, [pathname])

  return (
    <Script
      id="cookiefirst-script"
      src={`https://consent.cookiefirst.com/sites/convention.cim.org-${process.env.NEXT_PUBLIC_COOKIE_FIRST_API_KEY}/consent.js`}
    />
  )
}

export default CookieFirstScript
