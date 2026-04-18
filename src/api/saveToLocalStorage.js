export const saveToLocalStorage = (projectsData) => {
  localStorage.setItem('projects_data', JSON.stringify(projectsData));
};