import styles from './styles.module.css'

export default function Header({activeContent, setActiveContent}) {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src="src/assets/images/headerLogo.svg" alt="" />
      <nav>
        <img 
          className={`${styles.item} ${activeContent === 'home' ? styles.active : ''}`} 
          src="src/assets/images/home.svg" alt=""
          onClick={() => setActiveContent('home')}
        />
        <img 
          className={`${styles.item} ${activeContent === 'todo' ? styles.active : ''}`} 
          src="src/assets/images/todo.svg" alt=""
          onClick={() => setActiveContent('todo')}
        />
        <img 
          className={`${styles.item} ${activeContent === 'converter' ? styles.active : ''}`} 
          src="src/assets/images/converter.svg" alt=""
          onClick={() => setActiveContent('converter')}
        />
        <img 
          className={`${styles.item} ${activeContent === 'user' ? styles.active : ''}`} 
          src="src/assets/images/user.svg" alt=""
          onClick={() => setActiveContent('user')}
        />
      </nav>
    </div>
  )
}