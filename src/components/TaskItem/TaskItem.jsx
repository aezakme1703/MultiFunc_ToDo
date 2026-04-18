
import { useContext } from 'react'
import { formatDate } from '../../helpers/formatDate'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { Reorder } from 'framer-motion'
import styles from './styles.module.css'

export default function TaskItem({task, onStatusChange}) {
  const { deleteTask, currentProject } = useContext(ProjectsContext)
  return (
    <Reorder.Item 
      value={task} 
      key={task.id}
      whileDrag={{
        scale: 1.02,
        boxShadow: "0px 1px 10px 1px rgba(0,0,0,0.1)"
      }}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
      className={styles.item}
    >
      <div className={styles.date}>{formatDate(task.created_date)}</div>
      <div className={styles.information}>
        <div className={styles.title}>{task.title}</div>
        <hr />
        <p className={styles.descr}>
          {task.descr}
        </p>
      </div>
      <button onClick={() => (deleteTask(currentProject.id, task.id))} className={`${styles.btn} ${styles.delete}`}><img src="src/assets/images/deleteTask.svg" alt="" /></button>
    </Reorder.Item>
  )
}
