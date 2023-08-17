import { useEffect, useState } from 'react'
import { Box, Heading, Paragraph } from 'grommet'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { useResponsive } from 'hooks/useResponsive'
import { useTimeoutInCallback } from 'hooks/useTimeoutInCallback'
import { Button } from 'components/shared/Button'
import { ExpandableBlock } from 'components/shared/ExpandableBlock'
import { Icon } from 'components/shared/Icon'

export const SearchInfoBanner = () => {
  const [userVisited, setUserVisited] = useLocalStorage('visited-before', null)
  const { viewport } = useResponsive()
  const { startTimer, clearTimer } = useTimeoutInCallback(() => {
    setShow(false)
  }, 450)
  const [bannerExpand, setBannerExpand] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setBannerExpand(false)
    startTimer()
  }

  useEffect(() => {
    if (!userVisited) {
      setUserVisited(true)
      setBannerExpand(true)
      setShow(true)
    }

    return () => clearTimer()
  }, [])

  if (!show) return null

  return (
    <ExpandableBlock duration=".48s" expand={bannerExpand}>
      {viewport !== 'small' ? (
        <Box background="gradientLightReverse" pad="small">
          <Box alignSelf="end">
            <Button
              icon={<Icon name="Close" size="16px" />}
              onClick={handleClose}
              link
            />
          </Box>
          <Box align="center">
            <Heading color="brand-shade-40" level={1} size="small" weight={500}>
              Build and Download Custom Datasets
            </Heading>
            {/* to preserve the UI for desktop view */}
            <Box width={{ max: '600px' }}>
              <Paragraph
                color="brand-shade-40"
                textAlign="center"
                size="xlarge"
                margin={{ top: 'xsmall' }}
              >
                refine.bio helps you build ready-to-use datasets with normalized
                transcriptome data from all of the world’s genetic databases.
              </Paragraph>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          background="brand-shade-40"
          direction="row"
          justify="between"
          pad="small"
        >
          <Paragraph color="white">
            Search and download from a collection of normalized transcriptome
            data.
          </Paragraph>
          <Box>
            <Button
              icon={<Icon name="Close" size="16px" color="white" />}
              onClick={handleClose}
              link
            />
          </Box>
        </Box>
      )}
    </ExpandableBlock>
  )
}

export default SearchInfoBanner
