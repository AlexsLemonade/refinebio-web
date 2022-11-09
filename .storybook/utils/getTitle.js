import config from './config'

// Returns the story's title based on the given string
export const getTitle = (storyName) => {
  const title = Object.entries(config.titles).find(([key, value]) =>
    value.includes(storyName)
  )

  return title ? `${title[0]}/${storyName}` : null
}
