const STORAGE_KEY = 'projects_data';

export const storage = {
  get: () => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return 0;
    }
  },
  
  set: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  },
  
  remove: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
};