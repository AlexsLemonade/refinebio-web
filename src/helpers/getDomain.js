import isWindow from './isWindow'
// Returns the current domain where the application is running.
// NOTE: if using environment variables, this needs to be updated
// https://github.com/AlexsLemonade/refinebio-frontend/pull/44#discussion_r191784930

export default () => {
  return isWindow ? window.location.origin : null
}
