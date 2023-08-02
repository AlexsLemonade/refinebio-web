import { createContext } from 'react'

export const TextHighlightContext = createContext()

export const TextHighlightContextProvider = ({ match, children }) => {
  return (
    <TextHighlightContext.Provider value={match}>
      {children}
    </TextHighlightContext.Provider>
  )
}
