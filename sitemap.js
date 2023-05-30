/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// (resource) https://github.com/ekalinin/sitemap.js#readme
const { createGzip } = require('zlib')
const {
  createWriteStream,
  readdirSync,
  readFileSync,
  writeFile
} = require('fs')
const { resolve } = require('path')
const { SitemapAndIndexStream, SitemapStream } = require('sitemap')
const fetch = require('isomorphic-unfetch')
const moment = require('moment')
const { config, generateSitemapUrls } = require('./sitemap.config')

/* We generate a sitemap only if;
- it dose not exist
- it's more than 30 days old
- a local copy of resource count doesn't matches the API
*/

// checks the validity of an existing sitemap (if any)
const verifySitemap = async () => {
  let isValid = false
  const isSitemap =
    readdirSync(config.outDir).filter((file) =>
      file.match(/^sitemap.*[0-9].xml$/)
    ).length > 0

  // checks if the indexed sitemap already exists
  if (isSitemap) {
    const readableStream = await fetch(
      `${config.endpoints.experiments}&limit=1`
    )
    const response = await readableStream.json()
    const resourceInfo = readFileSync(
      `${config.outDir}/${config.sitemapInfoFile}`,
      {
        encoding: 'utf8'
      }
    )
    // checks if the localy copy of the resource count matches the API
    if (JSON.parse(resourceInfo).count === response.count) {
      // checks if the run date is more than 30 days old
      if (moment().diff(JSON.parse(resourceInfo).runAt, 'day') > 30) {
        isValid = false
      } else {
        isValid = true
      }
    }
  }

  return isValid
}

const generateSitemap = async () => {
  const { sitemapUrls, resourceInfo } = await generateSitemapUrls()

  const sms = new SitemapAndIndexStream({
    ...config.baseConfig,
    getSitemapStream: (i) => {
      const index = i + 1
      const sitemapStream = new SitemapStream({
        hostname: config.hostname
      })
      // emits generate files to the public folter
      const path = `${config.filePrefix}-${index}.xml`
      // compresses the output of the sitemap
      const gzip = sitemapStream
        .pipe(createGzip())
        .pipe(createWriteStream(resolve(`${config.outDir}/${path}.gz`))) // generates sitemap-${index}.xml.gz

      const ws = sitemapStream.pipe(
        createWriteStream(resolve(`${config.outDir}/${path}`))
      ) // generates sitemap-${index}.xml

      return [
        new URL(path, `${config.hostname}`).toString(),
        sitemapStream,
        ws,
        gzip
      ]
    }
  })

  sms.pipe(createWriteStream(resolve(`${config.outDir}/sitemap-index.xml`))) // generates sitemap-index.xml
  sitemapUrls.forEach((item) => sms.write(item))
  sms.end() // ends the stream

  // generates sitemap-info.json (includes the resource count and the run date)
  writeFile(
    `${config.outDir}/${config.sitemapInfoFile}`,
    JSON.stringify(resourceInfo),
    (err) => {
      console.log(err)
    }
  )
}

const init = async () => {
  const isValid = await verifySitemap()
  console.log(
    isValid ? 'Sitemap already exists ✅' : 'No valid sitemap found...'
  )

  if (isValid) return

  generateSitemap()
}

init()
