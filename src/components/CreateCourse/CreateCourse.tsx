import React, {useState} from 'react';
import './CreateCourse.css';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT, mockedAuthorsList } from '../../constants';
import { Input } from '../../common/Input/Input';
import generateId from '../../helpers/generateId';
import { createTitleInputConfig, 
        createDescriptionInputConfig, 
        createDurationInputConfig, 
        createAuthorNameInputConfig} from '../../helpers/createAuthInputConfig';
import { handleFormChange } from '../../helpers/handleFormChange';
import { handleFormSubmit } from '../../helpers/handleFormSubmit';
import getCourseDuration from '../../helpers/getCourseDuration';
import AuthorItem from '../AuthorItem/AuthorItem';
import { Author } from '../../helpers/getAuthorsNames';
interface CreateCourseProps {
   title: string
}

const CreateCourse: React.FC<CreateCourseProps> = ({title}) => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        duration: '',
        authorName: '',
    });

    const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
    const [authorInputKey, setAuthorInputKey] = useState(0);

    const [inputIds] = useState(() => ({
        title: generateId(),
        description: generateId(),
        duration: generateId(),
        authorName: generateId()
    }));


    const mainInfoInputs = [
        createTitleInputConfig(inputIds.title, values.title),
        createDescriptionInputConfig(inputIds.description, values.description),
    ];

    const durationInput = createDurationInputConfig(inputIds.duration, values.duration);
    const authorInput = createAuthorNameInputConfig(inputIds.authorName, values.authorName);

    const onChange = handleFormChange(setValues);
    const onSubmit = handleFormSubmit(values);

    const handleCreateAuthor = () => {
        if (values.authorName.trim()) {
            const newAuthor: Author = {
                id: generateId(),
                name: values.authorName.trim()
            };
            setAuthors([...authors, newAuthor]);
            setValues({ ...values, authorName: '' });
            setAuthorInputKey(prev => prev + 1);
        }
    };

    const handleAddAuthorToCourse = (author: Author) => {
        setAuthors(authors.filter(a => a.id !== author.id));
        setCourseAuthors([...courseAuthors, author]);
    };

    const handleRemoveAuthorFromCourse = (author: Author) => {
        setCourseAuthors(courseAuthors.filter(a => a.id !== author.id));
        setAuthors([...authors, author]);
    };

    const handleDeleteAuthor = (author: Author) => {
        setAuthors(authors.filter(a => a.id !== author.id));
    };

    const durationMinutes = parseInt(values.duration) || 0;
    const durationDisplay = getCourseDuration(durationMinutes);

  return (
    <form className="create-course-container" onSubmit={onSubmit}>
      <h1 className="create-course-title">{title}</h1>
      <fieldset className="create-course-fieldset">
        
            <h2 className="create-course-subtitle">Main info</h2>
            {mainInfoInputs.map((input) => (
                <Input key={input.id} 
                {...input} 
                onChange={onChange}
                />
            ))}
            <h2 className="duration-subtitle">Duration</h2>
            <div className="duration-input-wrapper">
                <Input 
                    {...durationInput} 
                    onChange={onChange}
                />
                <span className="duration-display">{durationDisplay}</span>
            </div>
            <div className="authors-wrapper">
                <div className="authors-left">
                    <div className="create-authors-wrapper">
                        <h2 className="authors-subtitle">Authors</h2>
                        <div className="author-input-wrapper">
                            <Input 
                                key={authorInputKey}
                                {...authorInput} 
                                onChange={onChange}
                            />
                            <Button 
                                buttonText={BUTTON_TEXT.CREATE_AUTHOR} 
                                type="button" 
                                className="main-button create-author-button"
                                onClick={handleCreateAuthor}
                            />
                        </div>
                    </div>
                    <div className="authors-list">
                        <h3 className="authors-list-subtitle">Authors list</h3>
                        <ul className="authors-list-ul">
                            {authors.map((author) => 
                                (<AuthorItem 
                                    key={author.id} 
                                    author={author}
                                    isAddButtonVisible={true}
                                    onAdd={() => handleAddAuthorToCourse(author)}
                                    onDelete={() => handleDeleteAuthor(author)}
                                />)
                                )}
                        </ul>
                    </div>
                </div>
                <div className="course-authors">
                    <h2 className="course-authors-subtitle">Course Authors</h2>
                    <ul className="course-authors-list">
                        {courseAuthors.length === 0 ? (
                            <li className="course-authors-list-item">Author list is empty</li>
                        ) : (
                            courseAuthors.map((author) => 
                                (<AuthorItem 
                                    key={author.id} 
                                    author={author}
                                    isAddButtonVisible={false}
                                    onDelete={() => handleRemoveAuthorFromCourse(author)}
                                />)
                            )
                        )}
                    </ul>
                </div>
            </div>
      </fieldset>
      <div className="create-course-buttons-container">
        <Button buttonText={BUTTON_TEXT.CREATE_COURSE} type="submit" className="main-button create-course-button" />
        <Button buttonText={BUTTON_TEXT.CANCEL} type="button" className="main-button cancel-button" />
      </div>
    </form>
  );
};

export default CreateCourse;