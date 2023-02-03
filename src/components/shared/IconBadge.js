import { Box, Grid, Text } from 'grommet'
import Accession from '../../images/accession.svg'
import Help from '../../images/help.svg'
import Organism from '../../images/organism.svg'
import MicroArray from '../../images/microarray.svg'
import MixedPlatform from '../../images/mixed-platform.svg'
import Rna from '../../images/rna.svg'
import Samples from '../../images/samples.svg'

const SVGs = {
  Accession,
  Help,
  Organism,
  MicroArray,
  MixedPlatform,
  Rna,
  Samples
}

export const IconBadge = ({ name, label, size = 'small', ...props }) => {
  const SVGIcon = SVGs[name]

  return (
    <Grid
      align="center"
      areas={[
        { name: 'left', start: [0, 1], end: [0, 1] },
        { name: 'right', start: [1, 1], end: [1, 1] }
      ]}
      columns={['26px', 'auto']}
      rows={['auto', 'auto']}
      gap={{
        column: 'xxsmall'
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Box gridArea="left">
        <SVGIcon aria-hidden role="presentation" focusable="false" />
      </Box>
      <Box gridArea="right">
        <Text margin={{ left: 'xxsmall' }} size={size}>
          {label}
        </Text>
      </Box>
    </Grid>
  )
}

export default IconBadge
