import { brands } from "./brands"
import { ListItem } from "./ListItem"
import styles from "./List.module.css"

export const List = () => {
  return (
    <div className={styles.container}>
      {
        brands.map((brand) => (
          <ListItem key={brand.brandId} {...brand} />
        ))
      }
    </div>
  )
}
