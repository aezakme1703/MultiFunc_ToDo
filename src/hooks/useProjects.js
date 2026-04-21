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
  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    saveProjects(updatedProjects);
  };
  const updateProjectTitle = (currentProject, newTitle) => {
    const updatedProjects = projects.map(project => {
      if (project.id === currentProject.id) {
        return {...project, title: newTitle}
      }
      return project
    })
    saveProjects(updatedProjects)
  }
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
  const deleteTask = (projectId, taskId) => {
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
  };
  const updateTask = (currentProject, currentTask, newTitle, newDescr) => {
    const updatedProjects = projects.map(project => {
      if (project.id === currentProject.id) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === currentTask.id) {
            return {...task, title: newTitle, descr: newDescr}
          }
          return task
        })
        return {...project, tasks: updatedTasks}
      }
      return project
    })
    saveProjects(updatedProjects)
  }
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
        let newCurrentTask
        const tasksWithoutCurrentTask = project.tasks.filter(task => {
          if (task.id === currentTask.id) {
            newCurrentTask = {...task, status: newStatus}
          }
          else return task
        })

        return {...project, tasks: [newCurrentTask, ...tasksWithoutCurrentTask]}
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
    updateProjectTitle,
    toggleProjectMark,

    addTask,
    deleteTask,
    updateTask,
    updateTasksOrder,
    changeTaskStatus,

    reloadProjects: loadProjects,
  };
}