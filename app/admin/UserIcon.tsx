'use client';

import { useFirebase } from "@bluesky-digital-labs/next-firebase-auth";
import Image from "next/image";
import styles from "./UserIcon.module.css"

export const UserIcon = () => {

  const { user } = useFirebase()

  if (!user) {
    return null;
  }

  if (!user.photoURL) {
    return null;
  }

  return (
    <Image 
      className={styles.img} 
      src={user.photoURL} 
      alt="Your User Icon" 
      width={42} 
      height={42} 
    />
  )
}