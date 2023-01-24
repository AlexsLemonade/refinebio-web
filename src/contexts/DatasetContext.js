import { createContext, useEffect, useMemo, useState } from 'react'

export const DatasetContext = createContext({})

export const DatasetContextProvider = ({ children }) => {
  const [dataset, setDataset] = useState({})
  const value = useMemo(
    () => ({
      dataset,
      setDataset
    }),
    [dataset, setDataset]
  )

  useEffect(() => {
    // endpoint: v1/dataset/${id}
    // e.g.) {data: {GSE116436: ["ALL"]}},
    // { GSE116436 : {all: true, total: 6633}}
    // delete(put) {data: {}}
    // {GSE116436: ['GSM3232647']}
    // passing {GSE116436: ['GSM3232650']} and append to the existing
    // {data: {GSE116436: ["GSM3232647", "GSM3232650"]}}
    // add remianing GSE116436 : {all: true, total: 6633}
    /*
        add(dataSetSlice) {
            const result = { ...this.dataSet };

            for (const accessionCode of Object.keys(dataSetSlice)) {
            if (dataSetSlice[accessionCode].all) {
                result[accessionCode] = ['ALL'];
            } else {
                result[accessionCode] = uniq([
                ...(result[accessionCode] || []),
                ...dataSetSlice[accessionCode],
                ]);
            }
            }
            return result;
        }
    */
  }, [])

  return (
    <DatasetContext.Provider value={value}>{children}</DatasetContext.Provider>
  )
}
