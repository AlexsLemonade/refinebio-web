// formats the API response to an object with an experiment accession code as its key
// e.g., { GSE116436: { all: true, total: num_downloadable_samples } }
export default (experimentAccessionCode, total) => ({
  [experimentAccessionCode]: { all: true, total }
})
