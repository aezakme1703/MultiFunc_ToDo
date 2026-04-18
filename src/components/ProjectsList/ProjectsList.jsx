import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NewProjectItem from '../NewProjectItem/NewProjectItem'
import ProjectItem from '../ProjectsItem/ProjectsItem'
import styles from './styles.module.css'

export default function ProjectsList({projects, currentProject, setCurrentProject}) {
  const [ isCreating, setIsCreating ] = useState(false)
  
  return (
    <div className={styles.container}>
      <h2 onClick={() => setCurrentProject(null)} className={styles.title}>Категории</h2>
      <button onClick={() => setIsCreating(!isCreating)} className={styles.addBtn}>
        <img 
          src="src/assets/images/arrowDown.svg" 
          className={`${styles.icon} ${isCreating ? styles.visible : styles.hidden}`} 
        />
        <img 
          src="src/assets/images/deleteTask.svg" 
          className={`${styles.icon} ${!isCreating ? styles.visible : styles.hidden}`} 
        />
      </button>

      <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            layout
          >
            {isCreating && <NewProjectItem setIsCreating={setIsCreating}/>}
          </motion.div>
      </AnimatePresence>

      
      <div className={styles.block}>
        <AnimatePresence mode="popLayout">
          {projects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <ProjectItem
                currentProject={currentProject}
                handleProject={setCurrentProject} 
                projectObj={project}
              >
                {project.title.trim()}
              </ProjectItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}