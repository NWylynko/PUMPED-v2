import { createModals } from "@/modules/better-react-modal";
import React from "react";

const modals = createModals({
  ImageSelector: React.lazy(() => import("@/features/imageUpload/modals/ImageSelector"))
})

export const ModalProvider = modals.ModalProvider;
export const useModals = modals.useModals;
export const Modal = modals.Modal;