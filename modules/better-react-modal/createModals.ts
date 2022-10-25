import { createModal } from './createModal';
import { createProvider } from './createProvider';


export type LazyModals = {
  [key: string]: React.LazyExoticComponent<() => JSX.Element>
}

export const createModals = <Modals extends LazyModals, > (lazyModals: Modals) => {

  const { ModalProvider, useModals } = createProvider<Modals>()

  const Modal = createModal<Modals>(useModals, lazyModals)

  return {
    ModalProvider,
    useModals,
    Modal
  }

}