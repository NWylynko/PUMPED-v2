import { initTRPC } from '@trpc/server';
import { Context } from './context';

export const t = initTRPC<{ ctx: Context }>()();