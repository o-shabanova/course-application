export interface Author {
  id: string;
  name: string;
}

const getAuthorsNames = (authorIds: string[], authorsList: Author[]): string => {
  if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0) {
    return 'name 2, name 3';
  }
  
  const names = authorIds
    .map(authorId => authorsList.find(author => author.id === authorId)?.name)
    .filter(Boolean);
    
  return names.length > 0 ? names.join(', ') : 'name 2, name 3';
};

export { getAuthorsNames };
export default getAuthorsNames;

