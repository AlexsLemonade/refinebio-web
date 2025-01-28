// Legacy URLs support for compendia routes
import { NextResponse } from 'next/server'

const matcherTab = '/compendia'
const matcherDownload = '/compendia/download'

export function middleware(request) {
  const url = request.nextUrl
  const defaultTab = '/compendia/normalized'
  const redirectTabs = {
    normalized: defaultTab,
    'rna-seq-sample': '/compendia/rna-seq'
  }

  if (url.pathname.startsWith(matcherTab)) {
    // Redirect to the coressponding tab based on query parameter 'c'
    const c = url.searchParams.get('c')
    if (c && redirectTabs[c]) {
      return NextResponse.redirect(new URL(redirectTabs[c], url.origin))
    }
  }

  // Redirect from compendia/download path to the defualt tab
  if (url.pathname === matcherDownload) {
    return NextResponse.redirect(new URL(defaultTab, url.origin))
  }

  return NextResponse.next()
}

export const config = {
  // Run middleware only on listed paths
  matcher: ['/compendia', '/compendia/download']
}
