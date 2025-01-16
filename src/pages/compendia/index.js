// For legacy URLs support
export const Compendia = () => {
  return null
}

export const getServerSideProps = async ({ query: { c } }) => {
  const getRedirect = (type) => ({
    redirect: {
      destination: `/compendia/${type}`,
      permanent: true
    }
  })

  if (c) {
    const type = c === 'rna-seq-sample' ? 'rna-seq' : 'normalized'
    return getRedirect(type)
  }

  return getRedirect('normalized')
}

export default Compendia
