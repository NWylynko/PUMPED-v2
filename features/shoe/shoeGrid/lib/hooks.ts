import { trpc } from "../trpc"

export const useShoeIds = trpc.getShoeIds.useQuery
export const useShoeDetails = trpc.getShoeDetails.useQuery
export const useShoeColourIds = trpc.getShoeColourIds.useQuery
export const useShoeColour = trpc.getShoeColour.useQuery