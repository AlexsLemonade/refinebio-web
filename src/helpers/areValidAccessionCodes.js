// Returns true if all accession codes in the given string (accessionCodes) are valid
// e.g.) "GSE3303, E-MEXP-3405, SRP2422"
export default (accessionCodes) => {
  if (!accessionCodes) return false

  const accessionCodeRegex = /^(GSE|ERP|SRP)(\d{3,6}$)|(E-[A-Z]{4}-\d{2,6}$)/i
  const accessionCodesList = accessionCodes.replace(/\s/g, '').split(/,| /i)

  return accessionCodesList.every((item) => accessionCodeRegex.test(item))
}
