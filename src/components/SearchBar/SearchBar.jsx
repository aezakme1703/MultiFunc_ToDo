import styles from './styles.module.css'

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder='Search' />
      <img className={styles.searchImg} src="src/assets/images/search.svg" alt="" />
    </div>
  )
}