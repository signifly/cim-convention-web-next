import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './i18nConfig'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    console.log(i18nRouter(request, i18nConfig))
    console.log(request.headers.get('x-next-i18n-router-locale'))

    const alreadyRewritten = request.headers.get('x-next-i18n-router-locale')
    if (alreadyRewritten) {
        return NextResponse.next()
    }

    return i18nRouter(request, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)', '/(en|fr)/:path*'],
}
