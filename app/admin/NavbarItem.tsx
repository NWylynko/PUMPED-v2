'use client';

import Link from "next/link"
import { useSelectedLayoutSegments } from 'next/navigation';
import styles from "./NavbarItem.module.css"

interface ItemProps {
  name: string;
  to: string;
}

export const Item = ({ name, to }: ItemProps) => {

  const segment = useSelectedLayoutSegments();

  const path = ['/admin', ...segment].join('/')
  const active = path === to

  return (
    <Link href={to}>
      <div className={styles.container} style={{
        backgroundColor: active ? "var(--red)" : "transparent"
      }}>
        <span>{name}</span>
      </div>
    </Link>
  )
}