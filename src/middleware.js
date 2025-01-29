// Legacy URLs support for compendia routes
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl
  const redirectTabs = {
    normalized: '/compendia/normalized',
    'rna-seq-sample': '/compendia/rna-seq'
  }

  // Old compendia page took a query parameter 'c'
  // This has been replaced with a path parameter.
  if (url.pathname === '/compendia') {
    const c = url.searchParams.get('c')
    if (c && redirectTabs[c]) {
      return NextResponse.redirect(new URL(redirectTabs[c], url.origin))
    }
  }

  // Old compendia download page took query parameters, 'organism_name' and 'url'
  // This has been moved and nested under path parameters for the compendium type and organism name.
  if (url.pathname === '/compendia/download') {
    return NextResponse.redirect(new URL(redirectTabs.normalized, url.origin))
  }

  // No redirect found, continue without redirecting
  return NextResponse.next()
}

export const config = {
  // Run middleware only on listed paths
  matcher: ['/compendia', '/compendia/download']
}
