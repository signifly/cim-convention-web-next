// @ts-nocheck
// @TODO: Add better types definition
'use client'
import React, { ReactNode, useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'
import Swiper from 'swiper'
import { SwiperOptions } from 'swiper/types'

export function SwiperContainer(
  props: SwiperOptions & { children: ReactNode } & HTMLAttributes<HTMLElement>,
) {
  const swiperRef = useRef<Swiper>(null)
  const { children, ...rest } = props

  useEffect(() => {
    // Register swiper web component
    register()

    // Pass component props to parameters
    const params = {
      ...rest,
    }

    // Assign to swiper element
    Object.assign(swiperRef.current, params)

    // Initialize swiper
    swiperRef.current?.initialize()
  }, [])

  // swiper-container is not a valid HTML element
  return (
    <swiper-container init="false" ref={swiperRef}>
      {children}
    </swiper-container>
  )
}

export function SwiperSlide(props: any) {
  const { children, ...rest } = props

  return <swiper-slide {...rest}>{children}</swiper-slide>
}
