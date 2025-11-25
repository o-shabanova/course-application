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

    const [touched, setTouched] = useState({
        title: false,
        description: false,
        duration: false,
        authorName: false,
    });

    const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

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

    const handleCreateAuthor = () => {
        if (values.authorName.trim()) {
            const newAuthor: Author = {
                id: generateId(),
                name: values.authorName.trim()
            };
            setAuthors([...authors, newAuthor]);
            setValues({ ...values, authorName: '' });
            setTouched({ ...touched, authorName: false });
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

    const resetForm = () => {
        setValues({
            title: '',
            description: '',
            duration: '',
            authorName: '',
        });
        setTouched({
            title: false,
            description: false,
            duration: false,
            authorName: false,
        });
        setAuthors(mockedAuthorsList);
        setCourseAuthors([]);
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isTitleValid = values.title.trim() !== '';
        const isDescriptionValid = values.description.trim() !== '';
        const isDurationValid = values.duration.trim() !== '' && parseInt(values.duration) > 0;

        if (isTitleValid && isDescriptionValid && isDurationValid) {
            const courseData = {
                title: values.title,
                description: values.description,
                duration: parseInt(values.duration),
                authors: courseAuthors
            };
            console.log('Course created:', courseData);
            resetForm();
        } else {
            setTouched({
                title: true,
                description: true,
                duration: true,
                authorName: false,
            });
        }
    };


   

  return (
    <form className="create-course-container" onSubmit={handleSubmit}>
      <h1 className="create-course-title">{title}</h1>
      <fieldset className="create-course-fieldset">
        
            <h2 className="create-course-subtitle">Main info</h2>
            {mainInfoInputs.map((input) => (
                <Input 
                    key={input.id} 
                    {...input} 
                    onChange={onChange}
                    touched={touched[input.name as keyof typeof touched]}
                    onFocus={() => setTouched({ ...touched, [input.name]: false })}
                    onBlur={() => setTouched({ ...touched, [input.name]: true })}
                />
            ))}
            <h2 className="duration-subtitle">Duration</h2>
            <div className="duration-input-wrapper">
                <Input 
                    {...durationInput} 
                    onChange={onChange}
                    touched={touched.duration}
                    onFocus={() => setTouched({ ...touched, duration: false })}
                    onBlur={() => setTouched({ ...touched, duration: true })}
                />
                <span className="duration-display">{durationDisplay}</span>
            </div>
            <div className="authors-wrapper">
                <div className="authors-left">
                    <div className="create-authors-wrapper">
                        <h2 className="authors-subtitle">Authors</h2>
                        <div className="author-input-wrapper">
                            <Input 
                                {...authorInput} 
                                onChange={onChange}
                                touched={touched.authorName}
                                onFocus={() => setTouched({ ...touched, authorName: false })}
                                onBlur={() => setTouched({ ...touched, authorName: true })}
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
        <Button 
        buttonText={BUTTON_TEXT.CREATE_COURSE} 
        type="submit" 
        className="main-button create-course-button" 
        />
        <Button 
        buttonText={BUTTON_TEXT.CANCEL} 
        type="button" 
        className="main-button cancel-button"
        onClick={handleCancel}
        />
      </div>
    </form>
  );
};

export default CreateCourse;