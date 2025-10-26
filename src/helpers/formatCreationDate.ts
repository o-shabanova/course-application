const formatCreationDate = (dateString: string): string => {
    const [month, day, year] = dateString.split('/');
    return `${day}.${month}.${year}`;
};

export default formatCreationDate;
