import { Fragment } from 'react'
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
import { FixedContainer } from 'components/shared/FixedContainer'
import config from 'components/Footer/config'
import styled, { css } from 'styled-components'
import { SrOnly } from 'components/shared/SrOnly'
import { CoinIcon } from '../../images/coin.svg'
import { TwitterIcon } from '../../images/twitter.svg'
import { GithubIcon } from '../../images/github.svg'

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

const Col = styled(Box)`
  width: fit-content;
  ${({ viewport }) =>
    viewport === 'small' &&
    css`
      margin: 24px 0;
    `}
  ${({ viewport }) =>
    viewport === 'medium' &&
    css`
      margin: 0 32px;
    `}
    ${({ viewport }) =>
    viewport === 'large' &&
    css`
      margin: 0 56px;
    `}
`

export const Footer = () => {
  const { viewport, setResponsive } = useResponsive()
  const { links, contributors, texts } = config
  return (
    <GrommentFooter
      background="gradient_light"
      elevation="medium"
      justify="center"
      fill
      gap="0"
      pad={{ vertical: setResponsive('large', 'xlarge') }}
      role="contentinfo"
    >
      <FixedContainer align="center">
        <Box pad={{ horizontal: setResponsive('0', '0', 'xlarge') }}>
          <Box direction={setResponsive('column', 'row')} justify="between">
            <Col viewport={viewport}>
              <Paragraph>
                {texts.about}{' '}
                <Anchor
                  label="Childhood Cancer Data Lab (CCDL)"
                  href={links.ccdl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Paragraph>
              <Box
                direction="row"
                justify="between"
                margin={{
                  top: setResponsive('large', 'xxlarge'),
                  bottom: setResponsive('medium', 'small')
                }}
              >
                <Button
                  gap="xxsmall"
                  href={links.donate}
                  label="Fund the CCDL"
                  icon={<CoinIcon aria-hidden />}
                  primary
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Box align="center" direction="row" gap="medium">
                  <TwitterLink
                    color="gray-shade-40"
                    href={links.ccdlTwitter}
                    margin={{ horizontal: setResponsive('24px', '0') }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon aria-hidden />
                    <SrOnly label="Follow us on Twitter" />
                  </TwitterLink>
                  <GithubLink
                    color="gray-shade-40"
                    href={links.ccdlGithub}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </Text>
                <Text>
                  Powered by{' '}
                  <Anchor
                    label="Alex’s Lemonade Stand Foundation"
                    href={links.alsf}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </Text>
              </Box>
            </Col>
            <Col viewport={viewport}>
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
                . <strong>{texts.refinebio}</strong>
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
                <i>{texts.note}</i>
              </Paragraph>
            </Col>
          </Box>
        </Box>

        <Box
          align={setResponsive('start', 'center')}
          direction={setResponsive('column', 'row')}
          justify="between"
          fill
          margin={{ top: setResponsive('0', 'large', 'xxxxlarge') }}
          pad={{
            horizontal: setResponsive('large', 'xxxxlarge', '88px')
          }}
        >
          <Box direction={setResponsive('column', 'row')} gap="medium">
            <Anchor
              color="gray-shade-40"
              label="BDS 3-Clause License"
              href="#url"
            />
            <Anchor color="gray-shade-40" label="Privacy" href="#url" />
            <Anchor color="gray-shade-40" label="Terms of Use" href="#url" />
            <Anchor color="gray-shade-40" label="Contact" href={links.mailTo} />
          </Box>
          <Box margin={{ top: setResponsive('medium', '0') }}>
            <Text color="gray-shade-40" size="xsmall">
              Version 24354-23111
            </Text>
          </Box>
        </Box>
      </FixedContainer>
    </GrommentFooter>
  )
}

export default Footer
