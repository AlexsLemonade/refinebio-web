export default (query) => {
  const accessionCodeRegex = /^(GSE|ERP|SRP)(\d{3,6}$)|(E-[A-Z]{4}-\d{2,6}$)/i

  if (!query) return []
  const accessionCodes = query.split(/,| /i)
  return accessionCodes.filter((code) => accessionCodeRegex.test(code))
}
