// For legacy URLs support
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl
  const defaultTab = '/compendia/normalized'
  const redirectTabs = {
    normalized: defaultTab,
    'rna-seq-sample': '/compendia/rna-seq'
  }

  if (url.pathname.startsWith('/compendia')) {
    if (url.pathname === '/compendia/download') {
      return NextResponse.redirect(new URL(defaultTab, url.origin))
    }

    const c = url.searchParams.get('c')
    if (c && redirectTabs[c]) {
      return NextResponse.redirect(new URL(redirectTabs[c], url.origin))
    }
  }

  return NextResponse.next()
}
