import { Fragment } from 'react'
import config from 'config/'
import { useResponsive } from 'hooks/useResponsive'
import {
  Box,
  Footer as GrommentFooter,
  Heading,
  Paragraph,
  Text
} from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Col } from 'components/shared/Col'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SrOnly } from 'components/shared/SrOnly'

import styled, { css } from 'styled-components'
import { CoinIcon } from '../images/coin.svg'
import { TwitterIcon } from '../images/twitter.svg'
import { GithubIcon } from '../images/github.svg'

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
  const { contributors, links } = config

  return (
    <GrommentFooter
      background="gradient_light"
      elevation="medium"
      justify="center"
      fill
      gap="0"
      pad={{ vertical: 'xlarge' }}
      role="contentinfo"
    >
      <FixedContainer align="center">
        <Box pad={{ horizontal: setResponsive('0', '0', 'xxxxxlarge') }}>
          <Row>
            {/* fixed svalue to preserve UI layout for wider screens */}
            <Col
              margin={{
                bottom: setResponsive('medium', 'small'),
                right: setResponsive('0', 'xxlarge', '148px')
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
                  target="_blank"
                />
              </Paragraph>
              <Box
                direction="row"
                justify="between"
                margin={{
                  top: setResponsive('medium', 'xxlarge'),
                  bottom: 'small'
                }}
              >
                <Button
                  gap="xxsmall"
                  href={links.donate}
                  label="Fund the CCDL"
                  icon={<CoinIcon aria-hidden />}
                  primary
                  rel="noopener noreferrer"
                  target="_blank"
                />
                <Box align="center" direction="row" gap="medium">
                  <TwitterLink
                    color="gray-shade-40"
                    href={links.ccdlTwitter}
                    margin={{ horizontal: setResponsive('xsmall', '0') }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <TwitterIcon aria-hidden />
                    <SrOnly label="Follow us on Twitter" />
                  </TwitterLink>
                  <GithubLink
                    color="gray-shade-40"
                    href={links.ccdlGithub}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GithubIcon aria-hidden />
                    <SrOnly label="View our refine.bio Github repository" />
                  </GithubLink>
                </Box>
              </Box>
              <Box>
                <Text>
                  Developed by{' '}
                  <Anchor
                    label="Childhood Cancer Data Lab"
                    href={links.ccdl}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                </Text>
                <Text>
                  Powered by{' '}
                  <Anchor
                    label="Alex’s Lemonade Stand Foundation"
                    href={links.alsf}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                </Text>
              </Box>
            </Col>
            <Col>
              <Heading
                level={5}
                style={{ fontFamily: `'Lato', sans-serif`, fontWeight: '700' }}
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
            </Col>
          </Row>
        </Box>

        <Row
          align={setResponsive('start', 'center')}
          fill
          margin={{ top: setResponsive('medium', 'large', 'xxxxlarge') }}
          pad={{
            horizontal: setResponsive('0', 'xxxxlarge', 'xxxxxlarge')
          }}
        >
          <Row gap="medium">
            <Anchor
              color="gray-shade-40"
              label="BDS 3-Clause License"
              href="#url"
            />
            <Anchor color="gray-shade-40" label="Privacy" href="#url" />
            <Anchor color="gray-shade-40" label="Terms of Use" href="#url" />
            <Anchor color="gray-shade-40" label="Contact" href={links.mailTo} />
          </Row>
          <Box margin={{ top: setResponsive('small', '0') }}>
            <Text color="gray-shade-40" size="xsmall">
              Version 24354-23111
            </Text>
          </Box>
        </Row>
      </FixedContainer>
    </GrommentFooter>
  )
}

export default Footer