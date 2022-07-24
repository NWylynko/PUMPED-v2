import { TRPCError } from '@trpc/server';
import { NextApiRequest } from 'next/types';
import "../lib/initializeFirebase";
import admin from 'firebase-admin';

const auth = admin.auth();

export async function getUserFromHeader(req: NextApiRequest) {

  const jwt = req.cookies.jwt ?? req.headers['x-jwt'] as string | undefined;

  const token = jwt === 'undefined' ? undefined : jwt

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const user = await auth.verifyIdToken(token)

  return user;
}
