// Formats the pipelines' name for UI (e.g., ['Salmon Quant', 'Tximport'] to 'Salmon Quant, and Specimen part')
export default (names) =>
  names.length === 1
    ? names[0]
    : `${names.slice(0, names.length - 1).join(', ')}, and ${
        names[names.length - 1]
      }`
