import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { isMatchPath } from 'helpers/isMatchPath'
import { Box, Nav, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { LayerResponsive } from 'components/shared/LayerLayerResponsive'
import { List } from 'components/shared/List'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'
import { LogoAnchor } from './LogoAnchor'
import { NavDropDown } from './NavDropDown'
import { NavLink } from './NavLink'
import { NavIcon } from './NavIcon'

export const GlobalNav = ({ light = false, toggle = false, setToggle }) => {
  const router = useRouter()
  const { asPath, pathname } = router
  const { viewport, setResponsive } = useResponsive()

  const buttonWidth = '80vw' // TEMP until creatre a custom budged button component

  const handleClick = () => {
    if (viewport !== 'small') return
    setToggle(!toggle)
  }

  return (
    <>
      {viewport === 'small' && (
        <NavIcon light={light} toggle={toggle} clickHandler={handleClick} />
      )}
      <LayerResponsive position="right" show={toggle}>
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
            <LogoAnchor
              margin={{ vertical: 'large' }}
              clickHandler={handleClick}
            />
          )}
          <List
            alignItems={setResponsive('start', 'center')}
            flexDirection={setResponsive('column', 'row')}
          >
            <Box
              margin={{ left: 'small' }}
              viewport={viewport}
              width={setResponsive('90%', 'auto')}
            >
              <NavLink
                active={isMatchPath(pathname, '/search')}
                label="Search"
                light={light}
                href="/search"
                viewport={viewport}
                clickHandler={handleClick}
              />
            </Box>
            <Box
              light={light}
              margin={{ left: 'small' }}
              viewport={viewport}
              width={setResponsive('90%', 'auto')}
            >
              {viewport === 'small' ? (
                <>
                  <Box
                    alignSelf="start"
                    pad={{ vertical: 'medium' }}
                    margin={{ horizontal: 'xlarge' }}
                    width={buttonWidth}
                  >
                    <Text size="large">
                      Compendia <Icon name="ChevronDown" size="xsmall" />
                    </Text>
                  </Box>
                  <NavLink
                    active={isMatchPath(asPath, '/compendia/normalized')}
                    label="Normalized Compendia"
                    light={light}
                    href="/compendia/normalized"
                    viewport={viewport}
                    clickHandler={handleClick}
                  />
                  <NavLink
                    active={isMatchPath(asPath, '/compendia/rna-seq')}
                    label="RNA-seq Sample Compendia"
                    light={light}
                    href="/compendia/rna-seq"
                    viewport={viewport}
                    clickHandler={handleClick}
                  />
                </>
              ) : (
                <NavDropDown
                  active={isMatchPath(pathname, '/compendia/[type]')}
                  light={light}
                />
              )}
            </Box>
            <Box
              margin={{ left: 'small' }}
              viewport={viewport}
              width={setResponsive('90%', 'auto')}
            >
              <NavLink
                label="Docs"
                light={light}
                href={links.refinebio_docs}
                rel="noopener noreferrer"
                viewport={viewport}
                clickHandler={handleClick}
              />
            </Box>
            <Box
              margin={{ left: 'small' }}
              viewport={viewport}
              width={setResponsive('90%', 'auto')}
            >
              <NavLink
                active={isMatchPath(pathname, '/about')}
                light={light}
                label="About"
                href="/about"
                viewport={viewport}
                clickHandler={() => handleClick()}
              />
            </Box>
            <Box
              margin={{
                left: setResponsive('none', 'small'),
                top: setResponsive('medium', 'none')
              }}
              viewport={viewport}
            >
              <Button
                label="My Dataset"
                aria-label="View My Dataset"
                badge={{ max: 10000, value: 0 }}
                margin={{ left: setResponsive('xlarge', 'none') }}
                width={viewport === 'small' ? buttonWidth : 'max-content'}
                light={viewport !== 'small' ? light : false}
                secondary
                style={{
                  fontSize: setResponsive('18px', '16px'),
                  padding: setResponsive('12px 0', '4px 24px'),
                  width: '100%'
                }}
              />
            </Box>
          </List>
        </Nav>
      </LayerResponsive>
    </>
  )
}
