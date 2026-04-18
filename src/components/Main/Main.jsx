import TodoPage from '../TodoPage/TodoPage'
import styles from './styles.module.css'

export default function Main({activeContent}) {
  return (
    <div className={styles.content}>
      {activeContent === 'todo' && <TodoPage />}
    </div>
  )
}