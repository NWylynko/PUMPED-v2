'use client';

import { useFirebase } from "@bluesky-digital-labs/next-firebase-auth";

export const LogoutButton = () => {

  const { logout } = useFirebase()

  return (
    <button style={{ height: 48 }} onClick={logout}>Logout</button>
  )
}