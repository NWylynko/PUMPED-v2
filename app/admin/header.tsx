
import Image from "next/image"
import styles from "./header.module.css"
import banner from "./slim-banner.png"
import { UserIcon } from "./UserIcon"
import { LogoutButton } from "./LogoutButton"

export const Header = () => {
  return (
    <header className={styles.container} >
      <Image src={banner} alt="Pumped Banner" width={361} height={125} />
      <div className={styles.buttons}>
        <UserIcon />
        <LogoutButton />
      </div>
    </header>
  )
}