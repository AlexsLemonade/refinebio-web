/* eslint-disable no-nested-ternary */
import mockDataExperiment from './mockDataExperiment'
import mockDataSamplesTable from './mockDataSamplesTable'
import mockDataSamplesByOrganismName from './mockDataSamplesByOrganismName'

const isFirst = (accessionCode) => accessionCode === 'GSE116436'
const isSixth = (accessionCode) => accessionCode === 'ERP006132'
const isTenth = (accessionCode) => accessionCode === 'GSE57542'
const isArrayExpress = (accessionCode) => accessionCode === 'E-MTAB-1811'
const pageSizes = [10, 20, 50]

export const getExperimentPageData = (accessionCode) => {
  const first = isFirst(accessionCode)
  const sixth = isSixth(accessionCode)
  const tenth = isTenth(accessionCode)
  const arrayExpress = isArrayExpress(accessionCode)
  const experiment = first
    ? mockDataExperiment[0]
    : sixth
    ? mockDataExperiment[2]
    : tenth
    ? mockDataExperiment[3]
    : arrayExpress
    ? mockDataExperiment[4]
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

export const getSamplesTableData = (accessionCode, pageSize, setTableData) => {
  const first = isFirst(accessionCode)
  const sixth = isSixth(accessionCode)
  const tenth = isTenth(accessionCode)
  const arrayExpress = isArrayExpress(accessionCode)
  if (pageSize === pageSizes[0]) {
    setTableData(
      first
        ? mockDataSamplesTable[0][0]
        : sixth
        ? mockDataSamplesTable[2][0]
        : tenth
        ? mockDataSamplesTable[3][0]
        : arrayExpress
        ? mockDataSamplesTable[4][0]
        : mockDataSamplesTable[1][0]
    )
  } else if (pageSize === pageSizes[1]) {
    setTableData(
      first
        ? mockDataSamplesTable[0][1]
        : sixth
        ? mockDataSamplesTable[2][1]
        : tenth
        ? mockDataSamplesTable[3][0]
        : arrayExpress
        ? mockDataSamplesTable[4][0]
        : mockDataSamplesTable[1][1]
    )
  } else if (pageSize === pageSizes[2]) {
    setTableData(
      first
        ? mockDataSamplesTable[0][2]
        : sixth
        ? mockDataSamplesTable[2][2]
        : tenth
        ? mockDataSamplesTable[3][0]
        : arrayExpress
        ? mockDataSamplesTable[4][0]
        : mockDataSamplesTable[1][2]
    )
  }
}

export const getSamplesByOrganismName = (organismName, setTableData) => {
  const isHomoSapiens = organismName === 'HOMO_SAPIENS'
  const samples = isHomoSapiens
    ? mockDataSamplesByOrganismName[0]
    : mockDataSamplesByOrganismName[1]

  setTableData(samples)
}
