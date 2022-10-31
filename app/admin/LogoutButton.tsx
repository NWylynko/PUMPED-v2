'use client';

import { useFirebase } from "@bluesky-digital-labs/next-firebase-auth";
import styles from "./LogoutButton.module.css"

export const LogoutButton = () => {

  const { logout } = useFirebase()

  return (
    <button className={styles.button} onClick={logout}>Logout</button>
  )
}