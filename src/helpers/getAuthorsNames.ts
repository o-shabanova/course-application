export interface Author {
  id: string;
  name: string;
}

const getAuthorsNames = (authorIds: string[], authorsList: Author[]): string => {
  if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0) {
    return 'name2, name3';
  }
  
  const names = authorIds
    .map(authorId => authorsList.find(author => author.id === authorId)?.name)
    .filter(Boolean);
    
  return names.length > 0 ? names.join(', ') : 'name2, name3';
};

export default getAuthorsNames;

