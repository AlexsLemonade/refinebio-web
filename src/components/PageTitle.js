import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export const PageTitle = ({ title = '' }) => {
  const router = useRouter()
  const [path, setPath] = useState('')
  const home = /\/$/.test(path)

  useEffect(() => {
    setPath(router.asPath)
  }, [router, path])

  const appName = 'refine.bio'
  let pageTitle = ''

  switch (true) {
    case title.length > 0:
      pageTitle = `${title}`
      break
    case home:
      pageTitle = `${appName} - Search for harmonized transcriptome data`
      break
    case /\/about$/.test(path):
      pageTitle = `About`
      break
    case /\/compendia/.test(path):
      if (path.includes('download')) {
        pageTitle = 'Download Compendia -'
      } else if (path.includes('normalized')) {
        pageTitle = 'Normalized Compendia'
      } else if (path.includes('rna-seq')) {
        pageTitle = 'RNA-seq Sample Compendia'
      }
      break
    case /\/dataset/.test(path):
      pageTitle = `Dataset -`
      break
    case /\/download/.test(path):
      pageTitle = `Download Dataset -`
      break
    case /\/license$/.test(path):
      pageTitle = `License -`
      break
    case /\/privvacy$/.test(path):
      pageTitle = `Privacy -`
      break
    case /\/terms$/.test(path):
      pageTitle = `Terms of Use -`
      break
    default:
      break
  }
  const formattedTitle = `${pageTitle} ${!home ? appName : ''}`

  return (
    <Head>
      <title>{formattedTitle.trim()}</title>
    </Head>
  )
}

export default PageTitle
