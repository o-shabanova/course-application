import React from 'react';
import './AuthorItem.css';
import { BUTTON_TEXT } from '../../constants';
import { Author } from '../../helpers/getAuthorsNames';
import Button from '../../common/Button/Button';

interface AuthorItemProps {
    author: Author;
    isAddButtonVisible?: boolean;
    onAdd?: () => void;
    onDelete?: () => void;
}

const defaultAuthor: Author = {
    id: '1',
    name: 'John Doe'
}
const AuthorItem: React.FC<AuthorItemProps> = ({
    author = defaultAuthor,
    isAddButtonVisible = true,
    onAdd,
    onDelete
}) => {
    return (
        <li className="author-item">
            <span className="author-name">{author.name}</span>
            {isAddButtonVisible && (
                <Button
                    buttonText={BUTTON_TEXT.ADD_AUTHOR}
                    type="button"
                    className="author-item-button add-author-button"
                    onClick={onAdd}
                />
            )}
            <Button
                buttonText={BUTTON_TEXT.DELETE_AUTHOR}
                type="button"
                className="author-item-button delete-author-button"
                onClick={onDelete}
            />
        </li>

    )
};

export default AuthorItem;