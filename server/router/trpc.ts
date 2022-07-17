import { initTRPC } from '@trpc/server';
import { Context, createContext } from '../context';

export const t = initTRPC<{ ctx: Context }>()();