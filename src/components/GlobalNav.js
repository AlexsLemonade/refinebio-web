import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Nav, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { links } from 'config'
import isMatchPath from 'helpers/isMatchPath'
import { BadgedButton } from 'components/BadgedButton'
import { Icon } from 'components/Icon'
import { LayerResponsive } from 'components/LayerResponsive'
import { List } from 'components/List'
import { LogoAnchor } from 'components/LogoAnchor'
import { NavDropDown } from 'components/NavDropDown'
import { NavIcon } from 'components/NavIcon'
import { NavLink } from 'components/NavLink'

export const GlobalNav = ({ light = false, toggle = false, setToggle }) => {
  const router = useRouter()
  const { asPath, pathname } = router
  const { viewport, setResponsive } = useResponsive()
  const { myDataset, myDatasetId, getDataset, getTotalSamples } =
    useDatasetManager()
  const [totalSamples, setTotalSamples] = useState()

  useEffect(() => {
    if (myDataset) setTotalSamples(getTotalSamples(myDataset.data))
  }, [myDataset])

  useEffect(() => {
    if (myDatasetId) getDataset()
  }, [myDatasetId])

  const handleClick = () => {
    if (viewport !== 'small') return
    setToggle(!toggle)
  }

  return (
    <>
      {viewport === 'small' && (
        <NavIcon light={light} toggle={toggle} onClick={handleClick} />
      )}
      <LayerResponsive position="right" show={toggle}>
        {viewport === 'small' && (
          <NavIcon light={light} toggle={toggle} onClick={handleClick} />
        )}
        <Nav
          align="center"
          background={setResponsive('white', 'transparent')}
          gap="none"
          height={setResponsive('100vh', 'auto')}
          pad={{ vertical: setResponsive('xlarge', 'none') }}
          role="navigation"
          style={{
            fontFamily: "'Rubik', sans-serif",
            position: setResponsive('fixed', 'relative'),
            zIndex: '2'
          }}
          toggle={toggle}
          width={setResponsive('100vw', 'auto')}
        >
          {viewport === 'small' && (
            <LogoAnchor margin={{ vertical: 'large' }} onClick={handleClick} />
          )}
          <List
            alignItems={setResponsive('start', 'center')}
            flexDirection={setResponsive('column', 'row')}
            width={setResponsive('100%', 'auto')}
          >
            <Box
              margin={{ left: setResponsive('none', 'small') }}
              viewport={viewport}
              width={setResponsive('100%', 'auto')}
            >
              <NavLink
                active={isMatchPath(pathname, '/search')}
                label="Search"
                light={light}
                href="/search"
                viewport={viewport}
                onClick={handleClick}
              />
            </Box>
            <Box
              light={light}
              margin={{ left: setResponsive('none', 'small', 'small') }}
              viewport={viewport}
              width={setResponsive('100%', 'auto')}
            >
              {viewport === 'small' ? (
                <>
                  <Box
                    alignSelf="start"
                    pad={{ vertical: 'small' }}
                    margin={{ horizontal: 'xlarge' }}
                  >
                    <Text size="large">
                      Compendia <Icon name="ChevronDown" size="xsmall" />
                    </Text>
                  </Box>
                  <Box pad={{ horizontal: 'small' }}>
                    <NavLink
                      active={isMatchPath(asPath, '/compendia/normalized')}
                      label="Normalized Compendia"
                      light={light}
                      href="/compendia/normalized"
                      viewport={viewport}
                      onClick={handleClick}
                    />
                    <NavLink
                      active={isMatchPath(asPath, '/compendia/rna-seq')}
                      label="RNA-seq Sample Compendia"
                      light={light}
                      href="/compendia/rna-seq"
                      viewport={viewport}
                      onClick={handleClick}
                    />
                  </Box>
                </>
              ) : (
                <NavDropDown
                  active={isMatchPath(pathname, '/compendia/[type]')}
                  light={light}
                />
              )}
            </Box>
            <Box
              margin={{ left: setResponsive('none', 'small') }}
              viewport={viewport}
              width={setResponsive('90%', 'auto')}
            >
              <NavLink
                label="Docs"
                light={light}
                href={links.refinebio_docs}
                rel="noopener noreferrer"
                viewport={viewport}
                onClick={handleClick}
              />
            </Box>
            <Box
              margin={{ left: setResponsive('none', 'small') }}
              viewport={viewport}
              width={setResponsive('90%', 'auto')}
            >
              <NavLink
                active={isMatchPath(pathname, '/about')}
                light={light}
                label="About"
                href="/about"
                viewport={viewport}
                onClick={handleClick}
              />
            </Box>
            <Box
              margin={{
                left: setResponsive('none', 'small'),
                top: setResponsive('medium', 'none')
              }}
              viewport={viewport}
              width={setResponsive('80%', 'auto')}
            >
              <BadgedButton
                aria-label="View My Dataset"
                count={totalSamples || 0}
                label="My Dataset"
                href="/download"
                light={viewport !== 'small' ? light : false}
                linkFontSize={setResponsive('18px', '16px')}
                margin={{ left: setResponsive('xlarge', 'none') }}
                pad={setResponsive('12px 0', '4px 24px')}
                responsive
                secondary
              />
            </Box>
          </List>
        </Nav>
      </LayerResponsive>
    </>
  )
}
