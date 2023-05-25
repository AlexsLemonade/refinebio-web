/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
// const fetch = require('isomorphic-unfetch')
const sitemap = require('../../sitemap.config')
const formatURLString = require('./formatURLString')

// Returns a sitemap url for the given resource
const getSitemapUrlForResource = (resource) => {
  return (result) => {
    const resourceUrl = {}

    // add a custom url setting for each given resource
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

// Returns an array of sitemap urls for all resources
const getSitemapUrlsForResources = async (...resources) => {
  const urls = []

  for (const resource of resources) {
    let current = sitemap.endpoints[resource]
    let i = 0 // TEMPORARY uese i variable for development
    while (current && i < 2) {
      try {
        console.log(`Fetching ${resource} from ${current}`)
        const readableStream = await fetch(current)
        const response = await readableStream.json()

        if (response.next) {
          // TEMPORARY replaces protocol to prevent error while fetching
          current = response.next.replace('http', 'https')
        }

        urls.push(...response.results.map(getSitemapUrlForResource(resource)))
        i += 1
      } catch (e) {
        console.log(`Encountered error ${e}`)
        current = null
      }
    }
  }

  return urls
}

const generateSitemapUrls = async () => {
  console.log('Building Site Sitemap...')
  const staticUrls = sitemap.staticPaths.map((path) => ({
    url: `${sitemap.hostname}${path}`,
    lastmod: `${new Date().toISOString()}`,
    priority: 0.5
  }))
  const resourceUrls = await getSitemapUrlsForResources(
    ...Object.keys(sitemap.endpoints)
  )

  return [...staticUrls, ...resourceUrls]
}
// supports CommonJS exports (used in sitemap.js)
module.exports = generateSitemapUrls
