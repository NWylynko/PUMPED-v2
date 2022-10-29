
import styles from "./layout.module.css"

import { Navbar } from "./Navbar";
import { Header } from "./header";

export default function AdminLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </>
  );
}
