import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/FixedContainer'
import { PageTitle } from 'components/PageTitle'

export const PageStatic = ({ pageTitle, width = '800px', children }) => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <PageTitle title={pageTitle} />
      <Box
        margin={{
          vertical: 'large'
        }}
        pad={{ horizontal: setResponsive('small', 'medium', 'none') }}
      >
        <FixedContainer width={width}>{children}</FixedContainer>
      </Box>
    </>
  )
}
export default PageStatic
