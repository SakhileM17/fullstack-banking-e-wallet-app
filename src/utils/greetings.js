export const greeting = () => {
    const timeOfDay = getTime();
  
    if (timeOfDay < 12) {
      return "Good morning";
    } else if (timeOfDay >= 12 && timeOfDay < 19) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }
  
  const getTime = () => {
    const now = new Date();
    return now.getHours();
  }