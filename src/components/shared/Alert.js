import { useLocalStorage } from 'hooks/useLocalStorage'
import { Box, Paragraph, Text } from 'grommet'

export const Alert = ({ message, dismissableKey }) => {
  const [dismiss, setDismiss] = useLocalStorage(`alert/${dismissableKey}`, null)

  if (dismiss) return null

  return (
    <Box pad="xxsmall">
      <Box
        align="center"
        background="white"
        direction="row"
        elevation="alert"
        pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
      >
        <Paragraph>
          <Box
            as="span"
            background={{
              image: 'url(/warning-yellow.svg)',
              position: 'center',
              repeat: 'no-repeat',
              size: '100%'
            }}
            width="24px"
            height="24px"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          <Text margin={{ left: 'xsmall' }} style={{ verticalAlign: 'middle' }}>
            {message}{' '}
          </Text>
          <Text
            color="brand"
            margin={{ left: 'xsmall' }}
            role="button"
            style={{ textDecoration: 'underline' }}
            onClick={() => setDismiss(true)}
          >
            Dismiss
          </Text>
        </Paragraph>
      </Box>
    </Box>
  )
}

export default Alert
