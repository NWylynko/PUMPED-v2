import { trpc } from "@/lib/trpc"

export const useShoes = trpc.shoe.getAll.useQuery