'use client';

import Link from "next/link";
import { useSelectedLayoutSegments } from 'next/navigation';

interface Brand {
  brandId: string;
  name: string;
  website: string;
}

export const ListItem = ({ brandId, name, website }: Brand) => {

  const segment = useSelectedLayoutSegments();

  const active = segment[0] === brandId;

  return (
    <Link href={`/admin/brand/${brandId}`}>
      <div style={{
        border: "2px dotted var(--red)",
        borderStyle: active ? "solid" : "dotted",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        gap: 8
      }}>
        <span
          style={{
            fontSize: 24
          }}
        >{name}</span>
        <span
          style={{
            color: "#7C7C7C"
          }}
        >{website}</span>
      </div>
    </Link>
  );
};
