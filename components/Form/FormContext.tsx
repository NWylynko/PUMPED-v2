import { createFastContext } from "@/lib/createFastContext";


const { Provider, useStore } = createFastContext({
  submitting: false
})

export const MetaFormProvider = Provider;
export const useMetaForm = useStore;