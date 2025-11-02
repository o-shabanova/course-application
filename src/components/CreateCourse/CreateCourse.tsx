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
import { handleFormSubmit } from '../../helpers/handleFormSubmit';

interface CreateCourseProps {
    title: string;
}

const CreateCourse: React.FC<CreateCourseProps> = ({title}) => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        duration: '',
        authorName: '',
    });

    const [inputIds] = useState(() => ({
        title: generateId(),
        description: generateId(),
        duration: generateId(),
        authorName: generateId()
    }));

    const inputs = [
        createTitleInputConfig(inputIds.title, values.title),
        createDescriptionInputConfig(inputIds.description, values.description),
        createDurationInputConfig(inputIds.duration, values.duration),
        createAuthorNameInputConfig(inputIds.authorName, values.authorName)
    ]

    const onChange = handleFormChange(setValues);
    const onSubmit = handleFormSubmit(values);
  return (
    <form className="create-course-container" onSubmit={onSubmit}>
      <h1 className="create-course-title">{title}</h1>
      <fieldset className="create-course-fieldset">
        
            <h2 className="create-course-subtitle">Main info</h2>
            {inputs.map((input) => (
                <Input key={input.id} 
                {...input} 
                onChange={onChange}
                />
            ))}
        
      </fieldset>
      <div className="create-course-buttons-container">
        <Button buttonText={BUTTON_TEXT.CREATE_COURSE} type="submit" className="main-button create-course-button" />
        <Button buttonText={BUTTON_TEXT.CANCEL} type="button" className="main-button cancel-button" />
      </div>
    </form>
  );
};

export default CreateCourse;