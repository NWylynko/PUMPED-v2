import { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import type { LazyModals } from "./createModals"
import type { Context } from "./createProvider";


export const createModal = <Modals extends LazyModals, > (useModals: () => Context<Modals>, lazyModals: Modals) => {
  const Modal = () => {

    const { openedModal, closeAny } = useModals();

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
      if (openedModal !== undefined) {
        dialogRef.current?.showModal()
      }
    }, [openedModal])

    if (openedModal === undefined) {
      return null;
    }

    // idk why I need to use as here, seems like ts gets confused hmm
    const Modal = lazyModals[openedModal] as React.LazyExoticComponent<() => JSX.Element>

    return (
      <Dialog ref={dialogRef}>
        <button onClick={closeAny}>Close</button>
        <Suspense fallback={<></>}>
          <Modal />
        </Suspense>
      </Dialog>
    )
  }
  return Modal
}

const Dialog = styled.dialog`

  min-width: 300px;

  min-height: 400px;

`;