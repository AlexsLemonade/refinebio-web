// (resource) https://usehooks-ts.com/react-hook/use-copy-to-clipboard
import { useState } from 'react'

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState(null)

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      // eslint-disable-next-line no-console
      console.warn('Clipboard not supported')

      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)

      return true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Copy failed', error)
      setCopiedText(null)

      return false
    }
  }

  return [copiedText, copy]
}
