import compendia from './interfaces/compendia'
import computedFiles from './interfaces/computedFiles'
import { downloader, processor } from './interfaces/jobs'
import dataset from './interfaces/dataset'
import experiments from './interfaces/experiments'
import originalFiles from './interfaces/originalFiles'
import samples from './interfaces/samples'
import search from './interfaces/search'
import token from './interfaces/token'

export const api = {
  compendia,
  computedFiles,
  downloader,
  experiments,
  dataset,
  originalFiles,
  processor,
  samples,
  search,
  token
}
