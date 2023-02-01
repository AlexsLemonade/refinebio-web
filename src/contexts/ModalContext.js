import { createContext, useMemo, useState } from 'react'

export const ModalContext = createContext()

// id must be unique
export const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState({ show: false, id: null })

  const closeModal = () => setModal({ show: false, id: null })

  const value = useMemo(
    () => ({ modal, closeModal, setModal }),
    [modal, closeModal, setModal]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
