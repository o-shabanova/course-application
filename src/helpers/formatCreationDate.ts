const formatCreationDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    return `${day}.${month}.${year}`;
};

export default formatCreationDate;
