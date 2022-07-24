import { trpc } from "@/lib/trpc"

export const useShoeIds = trpc.shoeGrid.getShoeIds.useQuery
export const useShoeDetails = trpc.shoeGrid.getShoeDetails.useQuery
export const useShoeColourIds = trpc.shoeGrid.getShoeColourIds.useQuery
export const useShoeColour = trpc.shoeGrid.getShoeColour.useQuery