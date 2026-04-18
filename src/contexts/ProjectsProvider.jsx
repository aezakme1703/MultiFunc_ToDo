import { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

const STORAGE_KEY = 'projects_data';

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProjects(parsedData.projects || []);
      } else {
        import('src/data.json').then(data => {
          setProjects(data.projects);
          saveToLocalStorage(data.projects);
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocalStorage = (projectsData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: projectsData }));
  };

  // const toggleProjectMarked = (projectId) => {
  //   setProjects(prev => {
  //     const newProjects = prev.map(project =>
  //       project.id === projectId 
  //         ? { ...project, marked: !project.marked }
  //         : project
  //     );
  //     saveToLocalStorage(newProjects);
  //     return newProjects;
  //   });
  // };

  // const deleteProject = (projectId) => {
  //   setProjects(prev => {
  //     const newProjects = prev.filter(project => project.id !== projectId);
  //     saveToLocalStorage(newProjects);
  //     if (currentProject?.id === projectId) {
  //       setCurrentProject(null);
  //     }
  //     return newProjects;
  //   });
  // };

  // const updateTask = (projectId, updatedTask) => {
  //   setProjects(prev => {
  //     const newProjects = prev.map(project => {
  //       if (project.id === projectId) {
  //         return {
  //           ...project,
  //           tasks: project.tasks.map(task =>
  //             task.id === updatedTask.id ? updatedTask : task
  //           )
  //         };
  //       }
  //       return project;
  //     });
  //     saveToLocalStorage(newProjects);
  //     return newProjects;
  //   });
  // };

  return (
    <ProjectsContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      loading: isLoading,
      toggleProjectMarked,
      deleteProject,
      updateTask
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};