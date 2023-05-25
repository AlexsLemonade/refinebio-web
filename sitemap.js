/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// (resource) https://github.com/ekalinin/sitemap.js#readme
const { createGzip } = require('zlib')
const { createWriteStream } = require('fs')
const { resolve } = require('path')
const { SitemapAndIndexStream, SitemapStream } = require('sitemap')
const generateSitemapUrls = require('./src/helpers/generateSitemapUrls')
const sitemap = require('./sitemap.config')

const generateSitemap = async () => {
  const sitemapUrls = await generateSitemapUrls() // the array of all urls for the sitemap (static path + resources)
  const sms = new SitemapAndIndexStream({
    ...sitemap.baseConfig,
    getSitemapStream: (i) => {
      const index = i + 1
      const sitemapStream = new SitemapStream({
        hostname: sitemap.hostname
      })
      // emit generate files to the public folter
      const path = `${sitemap.filePrefix}-${index}.xml`
      // compress the output of the sitemap
      const gzip = sitemapStream
        .pipe(createGzip())
        .pipe(createWriteStream(resolve(`${sitemap.outDir}/${path}.gz`))) // generate sitemap-${index}.xml.gz

      const ws = sitemapStream.pipe(
        createWriteStream(resolve(`${sitemap.outDir}/${path}`))
      ) // generate sitemap-${index}.xml

      return [
        new URL(path, `${sitemap.hostname}`).toString(),
        sitemapStream,
        ws,
        gzip
      ]
    }
  })

  sms.pipe(createWriteStream(resolve(`${sitemap.outDir}/sitemap-index.xml`))) // generate sitemap-index.xml
  sitemapUrls.forEach((item) => sms.write(item))
  sms.end() // end the stream
}

generateSitemap()
