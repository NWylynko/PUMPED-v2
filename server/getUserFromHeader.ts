import { TRPCError } from '@trpc/server';
import { NextApiRequest } from 'next/types';
import "../lib/initializeFirebase";
import admin from 'firebase-admin';

const auth = admin.auth();

export async function getUserFromHeader(req: NextApiRequest) {

  const jwt = req.cookies.jwt ?? req.headers['x-jwt'] as string | undefined;

  if (!jwt) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const user = await auth.verifyIdToken(jwt)

  return user;
}
