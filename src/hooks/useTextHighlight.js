import { useContext } from 'react'
import { TextHighlightContext } from 'contexts/TextHighlightContext'

export const useTextHighlight = () => useContext(TextHighlightContext)
