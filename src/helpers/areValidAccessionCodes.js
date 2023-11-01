// Returns true if all accession codes in the given string (accessionCodes) are valid
// e.g.) "GSE3303, E-MEXP-3405, SRP2422"
export default (accessionCodes, regex) => {
  if (!accessionCodes) return false

  const { accessionCode: re } = regex
  const accessionCodesList = accessionCodes.replace(/\s/g, '').split(/,| /i)

  return accessionCodesList.every((item) => re.test(item))
}
