import { Fragment } from 'react'
import {
  Box,
  Footer as GrommentFooter,
  Heading,
  Paragraph,
  Text
} from 'grommet'
import styled, { css } from 'styled-components'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'
import { cache, contributors, links } from 'config'
import { CoinIcon } from '../images/coin.svg'

const TwitterLink = styled(Anchor)`
  ${({ theme }) => css`
    &:hover {
      color: ${theme.global.colors.twitter};
    }
  `}
`

const GithubLink = styled(Anchor)`
  ${({ theme }) => css`
    &:hover {
      color: ${theme.global.colors.black};
    }
  `}
`

export const Footer = () => {
  const { setResponsive } = useResponsive()
  const anchorColor = 'gray-shade-40'

  return (
    <GrommentFooter
      background="gradientLight"
      elevation="medium"
      justify="center"
      fill
      gap="none"
      pad={{ vertical: 'xlarge' }}
      role="contentinfo"
    >
      <FixedContainer align="center">
        <Box pad={{ horizontal: setResponsive('none', 'none', 'basex9') }}>
          <Row>
            {/* fixed svalue to preserve UI layout for wider screens */}
            <Column
              margin={{
                bottom: setResponsive('medium', 'small'),
                right: setResponsive('none', 'basex6', '148px')
              }}
            >
              <Paragraph>
                refine.bio is a repository of harmonized, ready-to-use
                transcriptome data from publicly available sources. refine.bio
                is a project of the{' '}
                <Anchor
                  label="Childhood Cancer Data Lab (CCDL)"
                  href={links.ccdl}
                  rel="noopener noreferrer"
                />
              </Paragraph>
              <Box
                direction="row"
                justify="between"
                margin={{
                  top: setResponsive('medium', 'basex6'),
                  bottom: 'small'
                }}
              >
                <Button
                  gap="xxsmall"
                  href={links.ccdl_donate}
                  label="Fund the CCDL"
                  icon={<CoinIcon aria-hidden />}
                  primary
                  rel="noopener noreferrer"
                  target="_blank"
                />
                <Box align="center" direction="row" gap="medium">
                  <TwitterLink
                    color={anchorColor}
                    href={links.ccdl_twitter}
                    icon={<Icon link name="Twitter" />}
                    margin={{ horizontal: setResponsive('xsmall', 'none') }}
                    pad="0"
                    rel="noopener noreferrer"
                  />
                  <GithubLink
                    color={anchorColor}
                    href={links.ccdl_github}
                    icon={<Icon link name="Github" />}
                    pad="0"
                    rel="noopener noreferrer"
                  />
                </Box>
              </Box>
              <Box>
                <Text>
                  Developed by{' '}
                  <Anchor
                    label="Childhood Cancer Data Lab"
                    href={links.ccdl}
                    rel="noopener noreferrer"
                  />
                </Text>
                <Text>
                  Powered by{' '}
                  <Anchor
                    label="Alex’s Lemonade Stand Foundation"
                    href={links.alsf}
                    rel="noopener noreferrer"
                  />
                </Text>
              </Box>
            </Column>
            <Column>
              <Heading
                level={5}
                style={{ fontFamily: `'Lato', sans-serif` }}
                responsive={false}
                weight="bold"
              >
                Cite refine.bio
              </Heading>
              <Text>
                {contributors.map((name, i) => (
                  <Fragment key={name}>
                    {i ? ', ' : ''} {name}
                  </Fragment>
                ))}
                .{' '}
                <strong>
                  refine.bio: a resource of uniformly processed publicly
                  available gene expression datasets.
                </strong>
              </Text>
              <Text>
                URL:{' '}
                <Anchor
                  color="black"
                  label="https://www.refine.bio"
                  rel="nofollow"
                />
              </Text>
              <Paragraph margin={{ top: 'small' }}>
                <i>
                  Note that the contributor list is in alphabetical order as we
                  prepare a manuscript for submission
                </i>
              </Paragraph>
            </Column>
          </Row>
        </Box>

        <Row
          align={setResponsive('start', 'center')}
          fill
          margin={{ top: setResponsive('medium', 'large', 'basex8') }}
          pad={{
            horizontal: setResponsive('none', 'basex8', 'basex9')
          }}
        >
          <Row gap="medium">
            <Anchor
              color={anchorColor}
              label="BDS 3-Clause License"
              href="/license"
            />
            <Anchor color={anchorColor} label="Privacy" href="/privacy" />
            <Anchor color={anchorColor} label="Terms of Use" href="/terms" />
            <Anchor
              color={anchorColor}
              label="Contact"
              href={`mailto:${links.email_request_ccdl}`}
            />
          </Row>
          {cache.version && cache.xSourceRevision && (
            <Box margin={{ top: setResponsive('small', 'none') }}>
              <Text color={anchorColor} size="xsmall">
                Version {cache.xSourceRevision} - {cache.version.slice(1)}
              </Text>
            </Box>
          )}
        </Row>
      </FixedContainer>
    </GrommentFooter>
  )
}

export default Footer
