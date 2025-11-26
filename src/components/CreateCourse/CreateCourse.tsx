import React, {useState} from 'react';
import './CreateCourse.css';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import { Input } from '../../common/Input/Input';
import generateId from '../../helpers/generateId';
import { createTitleInputConfig, 
        createDescriptionInputConfig, 
        createDurationInputConfig, 
        createAuthorNameInputConfig} from '../../helpers/createAuthInputConfig';
import { handleFormChange } from '../../helpers/handleFormChange';
import { validateTitle, validateDescription, validateDuration, validateAuthorName } from '../../helpers/validation';
import getCourseDuration from '../../helpers/getCourseDuration';
import getCurrentDate from '../../helpers/getCurrentDate';
import AuthorItem from '../AuthorItem/AuthorItem';
import { Author } from '../../helpers/getAuthorsNames';

interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

interface CreateCourseProps {
   onCourseCreated?: (course: Course) => void;
   authors?: Author[];
   onAuthorCreated?: (author: Author) => void;
   onAuthorDeleted?: (authorId: string) => void;
   onCancel?: () => void;
}

const CreateCourse: React.FC<CreateCourseProps> = ({
    onCourseCreated,
    authors,
    onAuthorCreated,
    onAuthorDeleted,
    onCancel,
}) => {

    const defaultAuthors: Author[] = [
        { id: '1', name: 'John Doe' }
    ];

    const initialAuthors = authors && authors.length > 0 ? authors : defaultAuthors;

    const [allAuthors, setAllAuthors] = useState<Author[]>(initialAuthors);

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

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        duration: '',
        authorName: '',
    });

    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

    const availableAuthors = allAuthors.filter(
        author => !courseAuthors.some(ca => ca.id === author.id)
    );

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

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        setValues({ ...values, duration: numericValue });
    };

    const handleBlur = (fieldName: keyof typeof values) => {
        setTouched({ ...touched, [fieldName]: true });
        
        let error = '';
        if (fieldName === 'title') {
            error = validateTitle(values.title);
        } else if (fieldName === 'description') {
            error = validateDescription(values.description);
        } else if (fieldName === 'duration') {
            error = validateDuration(values.duration);
        } else if (fieldName === 'authorName') {
            error = validateAuthorName(values.authorName);
        }
        
        setErrors({ ...errors, [fieldName]: error });
    };

    const handleFocus = (fieldName: keyof typeof values) => {
        setTouched({ ...touched, [fieldName]: false });
    };

    const handleCreateAuthor = () => {
        const authorNameError = validateAuthorName(values.authorName);
        if (!authorNameError && values.authorName.trim()) {
            const newAuthor: Author = {
                id: generateId(),
                name: values.authorName.trim()
            };
            setAllAuthors([...allAuthors, newAuthor]);
            if (onAuthorCreated) {
                onAuthorCreated(newAuthor);
            }
            setValues({ ...values, authorName: '' });
            setTouched({ ...touched, authorName: false });
            setErrors({ ...errors, authorName: '' });
        } else {
            setTouched({ ...touched, authorName: true });
            setErrors({ ...errors, authorName: authorNameError || 'Author Name is required' });
        }
    };

    const handleAddAuthorToCourse = (author: Author) => {
        setCourseAuthors([...courseAuthors, author]);
    };

    const handleRemoveAuthorFromCourse = (author: Author) => {
        setCourseAuthors(courseAuthors.filter(a => a.id !== author.id));
    };

    const handleDeleteAuthor = (author: Author) => {
        setAllAuthors(allAuthors.filter(a => a.id !== author.id));
        if (onAuthorDeleted) {
            onAuthorDeleted(author.id);
        }
        setCourseAuthors(courseAuthors.filter(a => a.id !== author.id));
    };

    const durationMinutes = Number(values.duration) || 0;
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
        setErrors({
            title: '',
            description: '',
            duration: '',
            authorName: '',
        });
        setCourseAuthors([]);
    };

    const handleCancel = () => {
        resetForm();
        // Maybe it can help pass the test
        if (onCancel) {
            onCancel();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const titleError = validateTitle(values.title);
        const descriptionError = validateDescription(values.description);
        const durationError = validateDuration(values.duration);

        setErrors({
            title: titleError,
            description: descriptionError,
            duration: durationError,
            authorName: '',
        });

        setTouched({
            title: true,
            description: true,
            duration: true,
            authorName: false,
        });

        if (!titleError && !descriptionError && !durationError) {
            const newCourse: Course = {
                id: generateId(),
                title: values.title.trim(),
                description: values.description.trim(),
                creationDate: getCurrentDate(),
                duration: Number(values.duration),
                authors: courseAuthors.map(author => author.id)
            };
            
            if (onCourseCreated) {
                onCourseCreated(newCourse);
            }
            resetForm();
        }
    };


   

  return (
    <form className="create-course-container" onSubmit={handleSubmit} noValidate>
      <h1 className="create-course-title">Course edit/Create page</h1>
      <fieldset className="create-course-fieldset">
        
            <h2 className="create-course-subtitle">Main info</h2>
            {mainInfoInputs.map((input) => {
                const fieldName = input.name as keyof typeof touched;
                const hasError = touched[fieldName] && errors[fieldName];
                return (
                    <div key={input.id}>
                        <Input 
                            {...input} 
                            onChange={onChange}
                            hasError={!!hasError}
                            onFocus={() => handleFocus(input.name as keyof typeof values)}
                            onBlur={() => handleBlur(input.name as keyof typeof values)}
                        />
                        {hasError && (
                            <span className="error-message">{errors[fieldName]}</span>
                        )}
                    </div>
                );
            })}
            <h2 className="duration-subtitle">Duration</h2>
            <div className="duration-input-wrapper">
                <Input 
                    {...durationInput} 
                    onChange={handleDurationChange}
                    hasError={!!(touched.duration && errors.duration)}
                    onFocus={() => handleFocus('duration')}
                    onBlur={() => handleBlur('duration')}
                />
                {touched.duration && errors.duration && (
                    <span className="error-message">{errors.duration}</span>
                )}
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
                                hasError={!!(touched.authorName && errors.authorName)}
                                onFocus={() => handleFocus('authorName')}
                                onBlur={() => handleBlur('authorName')}
                            />
                            {touched.authorName && errors.authorName && (
                                <span className="error-message">{errors.authorName}</span>
                            )}
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
                            {availableAuthors.map((author) => 
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