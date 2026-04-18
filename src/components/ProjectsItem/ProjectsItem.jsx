import { useContext, useState } from 'react'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import styles from './styles.module.css'

export default function ProjectItem({children, projectObj}) {
  const [ isEditing , setIsEditing ] = useState(false)
  const [editValue, setEditValue] = useState(children)

  const { 
    deleteProject, 
    currentProject, 
    setCurrentProject,
    toggleProjectMark,
    updateProjectTitle
  } = useContext(ProjectsContext)

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
    setEditValue(children)
  }
  const handleSave = () => {
    if (editValue.trim() && editValue !== children) {
      updateProjectTitle(projectObj, editValue.trim())
    }
    setIsEditing(false)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(children)
    }
  }

  const isActive = projectObj.id === currentProject?.id

  return (
    <div 
      className={`${styles.item} ${isActive && styles.active}`} 
      onClick={() => setCurrentProject(projectObj)}
    >
      <div className={styles.leftGroup}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleProjectMark(projectObj.id)
          }} 
          className={`${styles.marked} ${projectObj.marked && styles.active}`}>
          <img src="src/assets/images/marked.svg" alt="" />
        </button>
        {isEditing ? 
          <input
              className={styles.editInput}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              autoFocus
            />:
          <span 
            className={styles.title}
            onDoubleClick={handleDoubleClick}
          >{children}</span>
        }
      </div>
      <button 
        className={styles.delete} 
        onClick={(e) => {
          e.stopPropagation();
          deleteProject(projectObj.id)
        }}
      >
        <img src="src/assets/images/deleteTask.svg" alt="" />
      </button>
    </div>
  )
}