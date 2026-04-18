import { Reorder } from 'framer-motion'
import { useState } from 'react'
import NewTaskModal from '../NewTaskModal/NewTaskModal'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

export default function TaskTypeBlock({title, children, count, tasks, onReorder}) {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const detectStatusOfTask = (title) => {
    if (title === 'В ожидании') {
      return 'pending'
    }
    if (title === 'В процессе') {
      return 'in_progress'
    }
    if (title === 'Выполнено') {
      return 'completed'
    }
  }
  return (
    <>
    <div className={styles.block}>
      <div className={styles.information}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{count}</span>
      </div>
      <button className={styles.addNewTask} onClick={() => setIsModalOpen(true)}>+ Добавить новую задачу</button>
      <Reorder.Group 
        axis="y" 
        values={tasks} 
        onReorder={onReorder}
        className={styles.taskList}
      >
        {children}
      </Reorder.Group>
    </div>

    {isModalOpen && createPortal(<NewTaskModal setIsModalOpen={setIsModalOpen} type={detectStatusOfTask(title)}/>, document.body)}
    </>
  )
}
