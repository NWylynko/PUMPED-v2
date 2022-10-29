'use client';

import { useFirebase } from "@bluesky-digital-labs/next-firebase-auth";
import Image from "next/image";

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
      style={{ borderRadius: "50%", border: "3px solid var(--red)" }} 
      src={user.photoURL} 
      alt="Your User Icon" 
      width={42} 
      height={42} 
    />
  )
}