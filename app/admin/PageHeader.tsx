
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  name: string;
  children: JSX.Element | JSX.Element[]
}

export const PageHeader = ({name, children}: PageHeaderProps) => {

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <div className={styles.button}>
        {children}
      </div>
    </div>
  )
}