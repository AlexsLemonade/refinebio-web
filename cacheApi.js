/* eslint-disable no-console */
/**
 * We run this script on every deploy to update /src/config/apiCache.json
 * which contains the cached data for the following resources:
 * - platforms (platforms, current api version)
 * - qn_targets
 * - stats-about
 */
const fs = require('fs')
const fetch = require('isomorphic-unfetch')

const version = process.env.VERSION || '0.0.0'
const apiVersion = process.env.API_VERSION || 'v1'
const apiPath = `${
  process.env.APT_PATH || 'https://api.refine.bio'
}/${apiVersion}`

const cacheApi = async () => {
  console.log(`Fetching data to be cached from ${apiPath}`)
  const [{ platforms, xSourceRevision }, qnTargets, statsAbout] =
    await Promise.all([getPlatforms(), getQnTargets(), getStatsAbout()])
  const cache = JSON.stringify(
    {
      version,
      xSourceRevision,
      platforms,
      qnTargets,
      statsAbout
    },
    null,
    2
  )

  fs.writeFileSync(`src/config/apiCache.json`, cache)
}

const getPlatforms = async () => {
  const url = `${apiPath}/platforms`

  try {
    const readableStream = await fetch(url)
    const response = await readableStream.json()

    return {
      platforms: response.reduce(
        (
          accum,
          { platform_name: name, platform_accession_code: accessionCode }
        ) => ({
          ...accum,
          [accessionCode]: name
        }),
        {}
      ),
      xSourceRevision: readableStream.headers.get('x-source-revision').slice(1)
    }
  } catch (e) {
    console.log('Error fetching platforms')
    return {}
  }
}

const getQnTargets = async () => {
  const url = `${apiPath}/qn_targets`

  try {
    const readableStream = await fetch(url)
    const response = await readableStream.json()

    return response.reduce(
      (accum, { name: organismName }) => ({
        ...accum,
        [organismName]: true
      }),
      {}
    )
  } catch {
    console.log('Error fetching qn targets')
    return false
  }
}

const getStatsAbout = async () => {
  const url = `${apiPath}/stats-about/`
  const defautStats = {
    // a copy of the latest stats-about via API
    samples_available: 1359087,
    total_size_in_bytes: 838823107099551,
    supported_organisms: 203,
    experiments_processed: 46324
  }

  try {
    const readableStream = fetch(url)
    const response = await readableStream.json()

    return response
  } catch {
    return defautStats
  }
}

cacheApi()
