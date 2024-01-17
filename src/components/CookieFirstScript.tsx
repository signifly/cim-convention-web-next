'use client'
import React, { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from '@/navigation'

const CookieFirstScript = () => {
  const router = useRouter()

  const reloadWidget = () => {
    const cookiePolicyContainer = document.getElementById(
      'cookiefirst-policy-page',
    )

    if (!cookiePolicyContainer) return
    router.refresh()
  }

  useEffect(reloadWidget, [])

  return (
    <Script
      id="cookiefirst-script"
      src={`https://consent.cookiefirst.com/sites/convention.cim.org-${process.env.NEXT_PUBLIC_COOKIE_FIRST_API_KEY}/consent.js`}
      defer
    />
  )
}

export default CookieFirstScript
