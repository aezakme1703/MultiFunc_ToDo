import styles from './styles.module.css'
import { images } from '../../assets/images'

export default function Header({activeContent, setActiveContent}) {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={images.headerLogo} alt="" />
      <nav>
        <img 
          className={`${styles.item} ${activeContent === 'home' ? styles.active : ''}`} 
          src={images.home} alt=""
          onClick={() => setActiveContent('home')}
        />
        <img 
          className={`${styles.item} ${activeContent === 'todo' ? styles.active : ''}`} 
          src={images.todo} alt=""
          onClick={() => setActiveContent('todo')}
        />
        <img 
          className={`${styles.item} ${activeContent === 'converter' ? styles.active : ''}`} 
          src={images.converter} alt=""
          onClick={() => setActiveContent('converter')}
        />
        <img 
          className={`${styles.item} ${activeContent === 'user' ? styles.active : ''}`} 
          src={images.user} alt=""
          onClick={() => setActiveContent('user')}
        />
      </nav>
    </div>
  )
}
