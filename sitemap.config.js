const apiVersion = process.env.API_VERSION || 'v1'
const apiPath = process.env.API_PATH || `https://api.refine.bio/${apiVersion}`
const hostname = process.env.HOST_NAME || 'https://www.refine.bio'
const limit = 3 // TEMPORARY for development purpose

const sitemap = {
  apiVersion,
  apiPath,
  endpoints: {
    experiments: `${apiPath}/search/?limit=${limit}&ordering=id`
  },
  hostname,
  outDir: `${__dirname}/public`,
  resourceNames: ['experiments'],
  staticPaths: ['/', '/about', '/license', '/privacy', '/terms'],
  filePrefix: 'sitemap',
  baseConfig: {
    lastmodDateOnly: false, // print date not time
    limit: 50000 // defaults to 45k
  }
}
// supports CommonJS exports (used in sitemap.js)
module.exports = sitemap
