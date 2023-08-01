import { createContext, useMemo, useState } from 'react'
import moment from 'moment'
import { Spinner } from 'grommet'
import { useLoader } from 'hooks/useLoader'
import { api } from 'api'

export const SampleDebugContext = createContext({})

const mergeJobs = (processorJobs, downloaderJobs) => {
  const processorJobsResult = processorJobs.map((job) => ({
    ...job,
    type: 'processor'
  }))
  const downloaderJobsResult = downloaderJobs.map((job) => ({
    ...job,
    type: 'downloader'
  }))

  return [...processorJobsResult, ...downloaderJobsResult].sort(
    (job1, job2) => {
      const date1 = job1.start_time || job1.created_at
      const date2 = job2.start_time || job2.created_at
      return moment(date1).isBefore(date2) ? 1 : -1
    }
  )
}

const getSampleDebug = async (accessionCode) => {
  const sample = await api.samples.get(accessionCode)
  const [computedFiles, originalFiles, downloaderJobs, processorJobs] =
    await Promise.all([
      api.computedFiles.get(sample.id),
      api.originalFiles.get(sample.id),
      api.downloader.get(accessionCode),
      api.processor.get(accessionCode)
    ])

  return {
    sample,
    originalFiles: originalFiles.results,
    computedFiles: computedFiles.results,
    jobs: mergeJobs(processorJobs.results, downloaderJobs.results)
  }
}

export const SampleDebugProvider = ({ accessionCode, children }) => {
  const [selectedOriginalFiles, setSelectedOriginalFiles] = useState({})

  const { data, isLoading } = useLoader(
    () => getSampleDebug(accessionCode),
    [accessionCode]
  )

  const contextValue = {
    data: data || {},
    isLoading,
    isFileSelected: (id) => selectedOriginalFiles[id],
    toggleFile: (id) =>
      setSelectedOriginalFiles({
        ...selectedOriginalFiles,
        [id]: !selectedOriginalFiles[id]
      })
  }

  const value = useMemo(() => contextValue, [contextValue])

  return (
    <SampleDebugContext.Provider value={value}>
      {isLoading ? <Spinner /> : children}
    </SampleDebugContext.Provider>
  )
}
