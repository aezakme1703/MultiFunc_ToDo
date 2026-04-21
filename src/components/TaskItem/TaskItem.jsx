
import { useContext, useState } from 'react'
import { formatDate } from '../../helpers/formatDate'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { Reorder } from 'framer-motion'
import UpdateTaskModal from '../UpdateTaskModal/UpdateTaskModal'
import { createPortal } from 'react-dom'
import styles  from './styles.module.css'
import { images } from '../../assets/images'

export default function TaskItem({task, onStatusChange}) {
  const { deleteTask, currentProject, changeTaskStatus } = useContext(ProjectsContext)
  const [ isHover, setIsHover ] = useState(false)

  const [ isModalOpen, setIsModalOpen ] = useState(false)


  const ArrowsBlock = () => {
    if (task.status === 'pending') {
      return (
        <>
          <img onClick={() => changeTaskStatus(currentProject.id, 'in_progress', task)} className={`${styles.arrow} ${styles.right}`} src={images.arrowDown} alt="" />
        </>
      )
    }
    else if (task.status === 'in_progress') {
      return (
        <>
          <img onClick={() => changeTaskStatus(currentProject.id, 'pending', task)} className={`${styles.arrow} ${styles.left}`} src={images.arrowDown} alt="" />
          <img onClick={() => changeTaskStatus(currentProject.id, 'completed', task)} className={`${styles.arrow} ${styles.right}`} src={images.arrowDown} alt="" />
        </>
      )
    }
    else {
      return (
        <>
          <img onClick={() => changeTaskStatus(currentProject.id, 'in_progress', task)} className={`${styles.arrow} ${styles.left}`} src={images.arrowDown} alt="" />
        </>
      )
    }
  }

  return (
    <>
      <Reorder.Item 
        onDoubleClick={() => setIsModalOpen(true)}
        value={task} 
        key={task.id}
        whileDrag={{
          scale: 1.02,
          boxShadow: "0px 1px 10px 1px rgba(0,0,0,0.1)"
        }}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
        className={styles.item}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
      >
        <div className={styles.date}>{formatDate(task.created_date)}</div>
        <div className={styles.information}>
          <div className={styles.title}>{task.title}</div>
          <hr />
          <p className={styles.descr}>
            {task.descr}
          </p>
        </div>
        <button onClick={() => (deleteTask(currentProject.id, task.id))} className={`${styles.btn} ${styles.delete}`}><img src={images.deleteTask} alt="" /></button>
        
        {isHover && <ArrowsBlock/>}
      </Reorder.Item>

      {isModalOpen && createPortal(<UpdateTaskModal task={task} setIsModalOpen={setIsModalOpen}/>, document.body)}
    </>
  )
}
