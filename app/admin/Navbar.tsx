
import { Item } from "./NavbarItem"
import styles from "./Navbar.module.css"

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Item name="Shoes" to="/admin/shoe/list" />
        <Item name="Brands" to="/admin/brand/list" />
        <Item name="Collections" to="/admin/collection/list" />
        <Item name="Sections" to="/admin/section/list" />
        <Item name="Styles" to="/admin/style/list" />
      </div>
      <div className={styles.section}>
        <Item name="Customers" to="/admin/customer/list" />
        <Item name="Reviews" to="/admin/review/list" />
        <Item name="Orders" to="/admin/order/list" />
      </div>
      <div className={styles.section}>
        <Item name="Images" to="/admin/image/list" />
      </div>
    </div>
  )
}

