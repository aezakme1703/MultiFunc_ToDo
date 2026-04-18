import { useContext, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TaskItem from '../TaskItem/TaskItem'
import TaskTypeBlock from '../TaskTypeBlock/TaskTypeBlock'
import styles from './styles.module.css'
import { ProjectsContext } from '../../contexts/ProjectsContext'

export default function TasksList({tasks}) {
  const pendingTasks = tasks.filter(task => task.status === 'pending')
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress')
  const completedTasks = tasks.filter(task => task.status === 'completed')
  const { currentProject, updateTasksOrder, changeTaskStatus} = useContext(ProjectsContext)

  return (
    <div className={styles.container}>
      <div className={styles.topBlock}>
        <h2 className={styles.title}>Задачи</h2>
        {/* <SearchBar /> */}
      </div>
      <div className={styles.main}>
        <TaskTypeBlock 
          title='В ожидании' 
          count={pendingTasks.length}
          tasks={pendingTasks}
          onReorder={(reorderedTasks) => updateTasksOrder(currentProject.id, 'pending', reorderedTasks)}
        >
          {pendingTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onStatusChange={(newStatus) => changeTaskStatus(currentProject.id, newStatus, task)}
            />
          ))}
        </TaskTypeBlock >
        <TaskTypeBlock 
          title='В процессе' 
          count={inProgressTasks.length}
          tasks={inProgressTasks}
          onReorder={(reorderedTasks) => updateTasksOrder(currentProject.id, 'in_progress', reorderedTasks)}
        >
          {inProgressTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TaskTypeBlock>
        <TaskTypeBlock 
          title='Выполнено' 
          count={completedTasks.length}
          tasks={completedTasks}
          onReorder={(reorderedTasks) => updateTasksOrder(currentProject.id, 'completed', reorderedTasks)}
        >
          {completedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TaskTypeBlock>
      </div>
    </div>
  )
}
