
// display a list of brands to select from, default to the top one

import Link from "next/link";
import { PageHeader } from "../PageHeader";
import { List } from "./List";
import styles from "./layout.module.css"

export default function BrandLayout({ children }: { children: JSX.Element }) {
  return (
    <div className={styles.container}>
      <PageHeader name="Brands">
        <Link href="/admin/brand/add">
          <button style={{ padding: 4 }}>Add Brand</button>
        </Link>
      </PageHeader>
      <List />
      {children}
    </div>
  );
}
