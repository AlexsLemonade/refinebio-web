// Returns the count of expriment by spcecies
export default (dataset, experiments) => {
  if (!dataset || !experiments) return {}

  const species = {}

  for (const accessionCode of Object.keys(dataset)) {
    const experimentInfo = experiments[accessionCode]

    if (!experimentInfo) return {}

    const { organism_names: organismNames } = experimentInfo

    for (const organism of organismNames) {
      if (!species[organism]) species[organism] = 0
      species[organism] += 1
    }
  }

  return species
}
