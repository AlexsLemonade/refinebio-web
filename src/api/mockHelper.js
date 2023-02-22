/* eslint-disable no-nested-ternary */
import mockDataExperiment from './mockDataExperiment'
import mockDataSamplesTable from './mockDataSamplesTable'

const isFirst = (accessionCode) => accessionCode === 'GSE116436'
const isSixth = (accessionCode) => accessionCode === 'ERP006132'
const isTenth = (accessionCode) => accessionCode === 'GSE57542'

export const getExperimentPageData = (accessionCode) => {
  const first = isFirst(accessionCode)
  const sixth = isSixth(accessionCode)
  const tenth = isTenth(accessionCode)
  const experiment = first
    ? mockDataExperiment[0]
    : sixth
    ? mockDataExperiment[2]
    : tenth
    ? mockDataExperiment[3]
    : mockDataExperiment[1]

  const samples = first
    ? mockDataSamplesTable[0][0]
    : sixth
    ? mockDataSamplesTable[2][0]
    : tenth
    ? mockDataSamplesTable[3][0]
    : mockDataSamplesTable[1][0]

  return { experiment, samples }
}

export const getSamplesTableData = (
  accessionCode,
  pageSize,
  pageSizes,
  setTableData
) => {
  const first = isFirst(accessionCode)
  const sixth = isSixth(accessionCode)
  const tenth = isTenth(accessionCode)
  if (pageSize === pageSizes[0]) {
    setTableData(
      first
        ? mockDataSamplesTable[0][0].results
        : sixth
        ? mockDataSamplesTable[2][0].results
        : tenth
        ? mockDataSamplesTable[3][0].results
        : mockDataSamplesTable[1][0].results
    )
  } else if (pageSize === pageSizes[1]) {
    setTableData(
      first
        ? mockDataSamplesTable[0][1].results
        : sixth
        ? mockDataSamplesTable[2][1].results
        : tenth
        ? mockDataSamplesTable[3][0].results
        : mockDataSamplesTable[1][1].results
    )
  } else if (pageSize === pageSizes[2]) {
    setTableData(
      first
        ? mockDataSamplesTable[0][2].results
        : sixth
        ? mockDataSamplesTable[2][2].results
        : tenth
        ? mockDataSamplesTable[3][0].results
        : mockDataSamplesTable[1][2].results
    )
  }
}
