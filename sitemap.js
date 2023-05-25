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
  const urls = await generateSitemapUrls()

  const sms = new SitemapAndIndexStream({
    ...sitemap.baseConfig,
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({
        hostname: sitemap.hostname
      })
      // emit generate files to the below path
      const path = `${sitemap.outDir}/${sitemap.filePrefix}-${i}.xml`
      // compress the output of the sitemap
      const gzip = sitemapStream
        .pipe(createGzip())
        .pipe(createWriteStream(resolve(`${path}.gz`))) // generate sitemap-${i}.xml.gz

      const ws = sitemapStream.pipe(createWriteStream(resolve(path))) // generate sitemap-${i}.xml

      return [
        new URL(path, `${sitemap.hostname}`).toString(),
        sitemapStream,
        ws,
        gzip
      ]
    }
  })

  urls.forEach((item) => sms.write(item))
  sms.end() // end the stream
}

generateSitemap()
