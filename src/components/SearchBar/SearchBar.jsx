import styles from './styles.module.css'
import { images } from '../../assets/images'

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder='Search' />
      <img className={styles.searchImg} src={images.search} alt="" />
    </div>
  )
}
