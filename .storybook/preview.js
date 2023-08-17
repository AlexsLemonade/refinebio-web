import { Grommet, Box } from 'grommet'
import { theme } from 'themes'
import { GlobalStyle } from 'styles/GlobalStyle'
import { ModalContextProvider } from 'contexts/ModalContext'

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
      a.title === b.title
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true })
  }
}

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <ModalContextProvider>
          <Box align="center">
            <Box>
              <Story />
            </Box>
          </Box>
          <div id="portal"></div>
        </ModalContextProvider>
      </Grommet>
    </>
  )
]
