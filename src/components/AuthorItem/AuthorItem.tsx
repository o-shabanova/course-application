import React from 'react';
import './AuthorItem.css';
import { BUTTON_TEXT } from '../../constants';
import { Author } from '../../helpers/getAuthorsNames';
import Button from '../../common/Button/Button';

interface AuthorItemProps {
    author: Author;
}

const defaultAuthor: Author = {
    id: '1',
    name: 'John Doe'
}
const AuthorItem: React.FC<AuthorItemProps> = ({author = defaultAuthor}) => {
    return (
            <li className="author-item">
            <span className="author-name">{author.name}</span>
            <Button buttonText={BUTTON_TEXT.ADD_AUTHOR} type="button" className="author-item-button add-author-button" />
            <Button buttonText={BUTTON_TEXT.DELETE_AUTHOR} type="button" className="author-item-button delete-author-button" />
            </li>
        
    )
};

export default AuthorItem;