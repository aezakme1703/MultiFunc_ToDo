import { useMemo, useState } from 'react'
import ProjectsList from '../ProjectsList/ProjectsList'
import TasksList from '../TasksList/TasksList'
import { ProjectsContext } from '../../contexts/ProjectsContext'

import { useProjects } from '../../hooks/useProjects'
import styles from './styles.module.css'


export default function TodoPage() {
  const { 
    projects,
    isLoading,

    addProject,
    deleteProject,
    updateProjectTitle,
    toggleProjectMark,

    addTask,
    deleteTask,
    updateTask,
    updateTasksOrder,
    changeTaskStatus,

    reloadProjects
  } = useProjects();

  const [currentProjectId, setCurrentProjectId] = useState(null);

  const currentProject = useMemo(() => {
    if (!currentProjectId) return null;
    return projects.find(project => project.id === currentProjectId) || null;
  }, [projects, currentProjectId]);

  const handleSetCurrentProject = (project) => {
    setCurrentProjectId(project?.id || null);
  };

  return (
    <ProjectsContext.Provider value={
      {
        currentProject,
        setCurrentProject: handleSetCurrentProject,

        addProject,
        deleteProject,
        updateProjectTitle,
        toggleProjectMark,

        addTask,
        deleteTask,
        updateTask,
        updateTasksOrder,
        changeTaskStatus,

        reloadProjects
      }
    }>
      <div className={styles.container}>
        <ProjectsList 
          projects={projects} 
          currentProject={currentProject} 
          setCurrentProject={handleSetCurrentProject}
        />
        {currentProject && <TasksList tasks={currentProject.tasks}/>}
      </div>
    </ProjectsContext.Provider>
  )
}