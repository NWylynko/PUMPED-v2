'use client';

import Link from "next/link";
import { useSelectedLayoutSegments } from 'next/navigation';
import styles from "./ListItem.module.css";

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
      <div
        className={styles.container}
        style={{
          borderStyle: active ? "solid" : "dotted",
          borderWidth: active ? 4 : 2
        }}
      >
        <span
          className={styles.title}
        >{name}</span>
        <span
          className={styles.subText}
        >{website}</span>
      </div>
    </Link>
  );
};
