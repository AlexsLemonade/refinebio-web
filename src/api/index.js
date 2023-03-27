import { computedFiles } from './interfaces/computedFiles'
import { downloader, processor } from './interfaces/jobs'
import { experiments } from './interfaces/experiments'
import { originalFiles } from './interfaces/originalFiles'
import { samples } from './interfaces/samples'
import { searchResults } from './interfaces/searchResults'

export const api = {
  computedFiles,
  downloader,
  experiments,
  originalFiles,
  processor,
  samples,
  searchResults
}
