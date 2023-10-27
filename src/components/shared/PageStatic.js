import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { PageTitle } from 'components/shared/PageTitle'

export const PageStatic = ({ pageTitle, children }) => {
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
        <FixedContainer width="800px">{children}</FixedContainer>
      </Box>
    </>
  )
}
export default PageStatic
