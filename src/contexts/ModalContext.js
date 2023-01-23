import { createContext, useMemo, useState } from 'react'

export const ModalContext = createContext()

export const ModalContextProvider = ({ children }) => {
  const [show, setShow] = useState(false)

  const open = () => setShow(true)
  const close = () => setShow(false)

  const value = useMemo(() => ({ show, close, open }), [show, close, open])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
