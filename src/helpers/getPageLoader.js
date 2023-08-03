import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default () => {
  NProgress.configure({
    showSpinner: false,
    easing: 'ease-in',
    speed: 500,
    trickleSpeed: 200,
    minimum: 0.65
  })

  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
}
