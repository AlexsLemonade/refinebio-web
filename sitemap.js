/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// (resource) https://github.com/ekalinin/sitemap.js#readme
const { createGzip } = require('zlib')
const { createWriteStream } = require('fs')
const { resolve } = require('path')
const { SitemapAndIndexStream, SitemapStream } = require('sitemap')
const { config, generateSitemapUrls } = require('./sitemap.config')

const generateSitemap = async () => {
  const sitemapUrls = await generateSitemapUrls() // the array of all urls for the sitemap (static path + resources)
  const sms = new SitemapAndIndexStream({
    ...config.baseConfig,
    getSitemapStream: (i) => {
      const index = i + 1
      const sitemapStream = new SitemapStream({
        hostname: config.hostname
      })
      // emit generate files to the public folter
      const path = `${config.filePrefix}-${index}.xml`
      // compress the output of the sitemap
      const gzip = sitemapStream
        .pipe(createGzip())
        .pipe(createWriteStream(resolve(`${config.outDir}/${path}.gz`))) // generate sitemap-${index}.xml.gz

      const ws = sitemapStream.pipe(
        createWriteStream(resolve(`${config.outDir}/${path}`))
      ) // generate sitemap-${index}.xml

      return [
        new URL(path, `${config.hostname}`).toString(),
        sitemapStream,
        ws,
        gzip
      ]
    }
  })

  sms.pipe(createWriteStream(resolve(`${config.outDir}/sitemap-index.xml`))) // generate sitemap-index.xml
  sitemapUrls.forEach((item) => sms.write(item))
  sms.end() // end the stream
}

generateSitemap()
