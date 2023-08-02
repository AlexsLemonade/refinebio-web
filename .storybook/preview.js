import { Grommet, Box } from 'grommet'
import { theme } from 'themes'
import { GlobalStyle } from 'styles/GlobalStyle'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
}

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <Box align="center">
          <Box>
            <Story />
          </Box>
        </Box>
      </Grommet>
    </>
  )
]
