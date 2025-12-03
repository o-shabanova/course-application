import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import formatCreationDate from '../../helpers/formatCreationDate';
import getCourseDuration from '../../helpers/getCourseDuration';
import getAuthorsNames from '../../helpers/getAuthorsNames';
import { RootState } from '../../store';
import { Course } from '../../store/courses/coursesSlice';
import './CourseInfo.css';

const CourseInfo: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useSelector((state: RootState) => state.courses);
  const authors = useSelector((state: RootState) => state.authors);
  
  if (!courseId || !courses) {
    return null;
  }
  
  const course = courses.find((c: Course) => c.id === courseId);
  
  if (!course) {
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
      <Link to="/courses">
        <Button 
        buttonText={BUTTON_TEXT.BACK} 
        type="button" 
        className="main-button back-button" 
        />
      </Link>
      </article>
    </main>
  );
};

export default CourseInfo;
