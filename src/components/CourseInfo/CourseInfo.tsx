import React from 'react';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT, mockedAuthorsList } from '../../constants';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthorsNames, Author } from '../../helpers/getAuthorsNames';
import './CourseInfo.css';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

interface CourseInfoProps {
  course: Course;
  authors: Author[];
}
const defaultCourse: Course = {
  id: '1',
  title: 'Course 1',
  description: 'Course 1 description',
  creationDate: '01/01/2025',
  duration: 60,
  authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d', 'f762978b-61eb-4096-812b-ebde22838167']
};

const CourseInfo:React.FC<Partial<CourseInfoProps>> = ({course = defaultCourse, authors = mockedAuthorsList}) => {
  if (!course || !authors) {
    return null;
  }
  
  const formattedCourseDuration = getCourseDuration(course.duration);
  const formattedCreationDate = formatCreationDate(course.creationDate);
  
  const authorNames = getAuthorsNames(course.authors, authors);

  return (
    <main className="course-info-container">
      <article className="course-info-content">
      <h1 className="course-info-card-title">{course.title}</h1>
      <div className="course-info-card-content">
          <div className="course-info-card-content-description">
            <p className="course-info-card-description-title"><span className="course-info-description-label">Description:</span></p>
            <p className="course-info-card-description-text">{course.description}</p>
          </div>
          <div className="course-info-card-content-details">
            <p className="course-info-card-id"><span className="course-info-card-label">ID:</span> {course.id}</p>
            <p className="course-info-card-duration"><span className="course-info-card-label">Duration:</span> {formattedCourseDuration}</p>
            <p className="course-info-card-creation-date"><span className="course-info-card-label">Created:</span> {formattedCreationDate}</p>
            <p className="course-info-card-authors"><span className="course-info-card-label">Authors:</span> {authorNames}</p>
          </div>     
      </div>
      <Button buttonText={BUTTON_TEXT.BACK} type="button" className="main-button back-button" />
      </article>
    </main>
  );
};

export default CourseInfo;
