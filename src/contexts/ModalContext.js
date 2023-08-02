import { createContext, useMemo, useState } from 'react'

export const ModalContext = createContext()

// each modal's "id" must to be unique
export const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState({})

  const openModal = (id) =>
    setModal((prev) => ({
      ...prev,
      [id]: {
        id,
        show: true
      }
    }))

  const closeModal = (id) =>
    setModal(() => {
      const temp = { ...modal }
      delete temp[id]

      return temp
    })

  const value = useMemo(
    () => ({ modal, closeModal, openModal }),
    [modal, closeModal, openModal]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
