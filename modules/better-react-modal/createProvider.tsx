import React, { createContext, useContext, useState } from "react"
import type { LazyModals } from "./createModals"

const InvalidFunction = () => { throw new Error(`Hook called outside of provider`) }

export type Context <Modals extends LazyModals, > = {
  open: (modal: keyof Modals) => void;
  close: (modal: keyof Modals) => void;
  closeAny: () => void;
  openedModal: keyof Modals | undefined;
}

export const createProvider = <Modals extends LazyModals, > () => {

  const Context = createContext<Context<Modals>>({
    open: InvalidFunction,
    close: InvalidFunction,
    closeAny: InvalidFunction,
    openedModal: undefined
  })

  const ModalProvider = ({ children }: { children: React.ReactNode }) => {

    const [openedModal, setOpenedModal] = useState<keyof Modals | undefined>()

    const open = (modal: keyof Modals) => {
      setOpenedModal(modal);
    }

    // this is a safe close as it stops you from accidentally closing the wrong modal
    // say this was to happen
    // 1. open modal a
    // 2. open modal b overwriting modal a
    // 3. process with modal a goes to call close()
    // this would close modal b which is not intended
    // so we ask for the modal you want to close
    // and only if its still the one that's currently open do we close it
    // this isn't perfect as you may have the same modal opened for a different purpose
    // but for now its a start.
    const close = (modal: keyof Modals) => {
      setOpenedModal(currentModal => {
        if (currentModal === modal) {
          return undefined;
        } else {
          return currentModal
        }
      })
    }

    // dangerous but needed sometimes
    const closeAny = () => {
      setOpenedModal(undefined)
    }

    const values = {
      open,
      close,
      closeAny,
      openedModal
    }

    return (
      <Context.Provider value={values}>
        {children}
      </Context.Provider>
    )
  }

  const useModals = () => useContext(Context)

  return {
    ModalProvider,
    useModals
  }

}