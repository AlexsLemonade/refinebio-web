/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const fetch = require('isomorphic-unfetch')
const formatURLString = require('./src/helpers/formatURLString')

const apiVersion = process.env.API_VERSION || 'v1'
const apiPath = process.env.API_HOST || `https://api.refine.bio/${apiVersion}`
const hostname = process.env.HOST_NAME || 'https://www.refine.bio'
const limit = 1000 // for API limit value
const config = {
  apiVersion,
  apiPath,
  endpoints: {
    experiments: `${apiPath}/search/?limit=${limit}&ordering=id`
  },
  filePrefix: 'sitemap',
  hostname,
  outDir: `${__dirname}/public`,
  sitemapInfoFile: 'sitemap-info.json',
  staticPaths: ['/', '/about', '/license', '/privacy', '/terms'],
  baseConfig: {
    limit: 50000 // a sitemap size limit
  }
}

// returns a sitemap url for the given resource
const getSitemapUrlForResource = (resource) => {
  return (result) => {
    const resourceUrl = {}
    // adds a custom url setting for each given resource
    switch (resource) {
      case 'experiments':
        resourceUrl.url = `/${resource}/${
          result.accession_code
        }/${formatURLString(result.title)}`
        resourceUrl.priority = 0.8
        break
      default:
        break
    }

    return resourceUrl
  }
}

// returns an array of the sitemap urls for all resources
const getSitemapUrlsForResources = async (...resources) => {
  const resourceUrls = []
  const resourceInfo = {}

  for (const resource of resources) {
    let current = `${config.endpoints[resource]}`

    while (current) {
      try {
        console.log(`Fetching ${resource} from ${current}`)
        const readableStream = await fetch(current)
        const response = await readableStream.json()
        current = response.next

        if (!resourceInfo.count) {
          resourceInfo.count = response.count
        }

        if (!resourceInfo.runAt) {
          resourceInfo.runAt = new Date()
        }

        resourceUrls.push(
          ...response.results.map(getSitemapUrlForResource(resource))
        )
      } catch (e) {
        console.log(`Encountered error ${e}`)
        current = null
      }
    }
  }

  return { resourceUrls, resourceInfo }
}

// returns an array of all sitemap urls (static paths + resources)
const generateSitemapUrls = async () => {
  console.log('Building Site Sitemap...')
  const staticUrls = config.staticPaths.map((path) => ({
    url: `${config.hostname}${path}`,
    lastmod: `${new Date().toISOString()}`,
    priority: 0.5
  }))
  const { resourceUrls, resourceInfo } = await getSitemapUrlsForResources(
    ...Object.keys(config.endpoints)
  )

  const sitemapUrls = [...staticUrls, ...resourceUrls]

  return { sitemapUrls, resourceInfo }
}
// supports CommonJS exports (used in sitemap.js)
module.exports = { config, generateSitemapUrls }
