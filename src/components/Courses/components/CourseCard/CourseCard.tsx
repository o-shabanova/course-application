import React from 'react';

import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import { BUTTON_TEXT } from '../../../../constants';

interface CourseCardProps {
    course: {
      id: string;
      title: string;
      description: string;
      creationDate: string;
      duration: number;
      authors: string[];
    };
    authorNames?: string[];
  }

const CourseCard: React.FC<CourseCardProps> = ({ course, authorNames }) => {
  return (
    <>
        <article className="course-card">
            
            <h1 className="course-card-title">{course.title}</h1>
            <p className="course-card-description">{course.description}</p>
            <div className="course-card-info">
                <p className="course-card-authors"><span className="course-card-info-label">Authors:</span> {authorNames?.join(', ')}</p>
                <p className="course-card-duration"><span className="course-card-info-label">Duration:</span> {course.duration} hours</p>
                <p className="course-card-creation-date"><span className="course-card-info-label">Created:</span> {course.creationDate}</p>
                <Button buttonText={BUTTON_TEXT.SHOW_COURSE} type="button" className="main-button" />
            </div>
        </article>
    </>
  );
};

export default CourseCard;
