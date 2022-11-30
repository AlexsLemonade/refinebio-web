import { Box, Text } from 'grommet'
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box direction="row" align="center" width="max-content" {...props}>
      <Box>
        <SVGIcon role="presentation" aria-hidden="true" focusable="false" />
      </Box>
      <Text margin={{ left: 'xxsmall' }} size={size}>
        {label}
      </Text>
    </Box>
  )
}

export default IconBadge
