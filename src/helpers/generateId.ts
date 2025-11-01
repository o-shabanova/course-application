const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
  
export default generateId;