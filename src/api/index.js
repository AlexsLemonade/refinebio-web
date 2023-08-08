import computedFiles from './interfaces/computedFiles'
import { downloader, processor } from './interfaces/jobs'
import dataset from './interfaces/dataset'
import experiments from './interfaces/experiments'
import originalFiles from './interfaces/originalFiles'
import samples from './interfaces/samples'
import search from './interfaces/search'

export const api = {
  computedFiles,
  downloader,
  experiments,
  dataset,
  originalFiles,
  processor,
  samples,
  search
}
