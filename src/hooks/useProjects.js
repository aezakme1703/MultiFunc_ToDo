import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';
import defaultData from '../data.json';


export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Загрузка проектов
  const loadProjects = useCallback(() => {
    setIsLoading(true);

    // Пытаемся загрузить из localStorage
    let savedProjects = storage.get();

    // Если в localStorage пусто, берем из JSON
    if (!savedProjects) {
      savedProjects = defaultData.projects
      storage.set(savedProjects);
    }
    else {
      savedProjects = JSON.parse(savedProjects)
    }
    setProjects(savedProjects);

    setIsLoading(false);
  }, []);
  

  const toggleProjectMark = (projectId) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project => {
        if (project.id === projectId) {
          return {...project, marked: !project.marked}
        }
        return project
      })
      saveProjects(updatedProjects);
      return updatedProjects
    })
  }

  // Сохранение проектов UI + LocalStorage
  const saveProjects = useCallback((newProjects) => {
    setProjects(newProjects);
    storage.set(newProjects);
  }, []);
  
  const addProject = (projectTitle) => {
    const newProject = {
      id: crypto.randomUUID(),
      title: projectTitle,
      marked: false,
      tasks: []
    }
    const updatedProjects = [newProject, ...projects]
    saveProjects(updatedProjects)
    return newProject
  }
  
  // Удаление проекта
  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    saveProjects(updatedProjects);
  };
  
  // Обновление проекта
  const updateProject = (projectId, updates) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    );
    saveProjects(updatedProjects);
  };
  

  const addTask = (projectId, taskTitle, taskDescr, type) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      descr: taskDescr,
      created_date: new Date(),
      status: type
    }
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {...project, tasks: [newTask, ...(project.tasks)]}
      }
      return project
    })
    saveProjects(updatedProjects)
  }

  // Удаление задачи
  const deleteTask = useCallback((projectId, taskId) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter(task => task.id !== taskId)
          };
        }
        return project;
      });
      storage.set(updatedProjects);
      return updatedProjects;
    });
  }, []);
  
  // Переключение статуса задачи
  const toggleTaskStatus = useCallback((projectId, taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId 
              ? { ...task, completed: !task.completed }
              : task
          )
        };
      }
      return project;
    });
    saveProjects(updatedProjects);
  }, [projects, saveProjects]);
  

  const updateTasksOrder = (projectId, type, reorderedTasks) => {

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const otherTasks = project.tasks.filter(task => task.status !== type)
        return {...project, tasks: [...reorderedTasks, ...otherTasks]}
      }
      return project
    })
    saveProjects(updatedProjects)
  }

  const changeTaskStatus = (projectId, newStatus, currentTask) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id = currentTask.id) {
            return {...task, status: newStatus}
          }
          return task
        })
        return {...project, tasks: updatedTasks}
      }
      return project
    })
    saveProjects(updatedProjects)
  }

  const updateProjectTitle = (currentProject, newTitle) => {
    const updatedProjects = projects.map(project => {
      if (project.id === currentProject.id) {
        return {...project, title: newTitle}
      }
      return project
    })
    saveProjects(updatedProjects)
  }
  // Загружаем данные при монтировании
  useEffect(() => {
    loadProjects();
  }, []);
  
  return {
    projects,
    isLoading,
    addProject,
    deleteProject,
    updateProject,
    addTask,
    deleteTask,
    toggleTaskStatus,
    reloadProjects: loadProjects,
    toggleProjectMark,
    updateTasksOrder,
    changeTaskStatus,
    updateProjectTitle
  };
}