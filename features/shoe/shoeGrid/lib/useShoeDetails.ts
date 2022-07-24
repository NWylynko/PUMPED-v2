import { trpc } from "@/lib/trpc"

export const useShoeDetails = trpc.shoe.getLightDetails.useQuery