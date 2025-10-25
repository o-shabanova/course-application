export const getCourseDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const hourText = hours === 1 ? 'hour' : 'hours';
    
    return `${formattedHours}:${formattedMinutes} ${hourText}`;

}