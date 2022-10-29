'use client';

import Link from "next/link"
import { useSelectedLayoutSegments } from 'next/navigation';

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
      <div style={{
        border: "2px solid var(--red)",
        borderRadius: 8,
        marginLeft: 18,
        marginRight: 18,
        padding: 12,
        backgroundColor: active ? "var(--red)" : "transparent"
      }}>
        <span>{name}</span>
      </div>
    </Link>
  )
}