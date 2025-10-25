import React from 'react';

import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import { BUTTON_TEXT } from '../../../../constants';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';

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
    const formattedCreationDate = formatCreationDate(course.creationDate);
    const formattedCourseDuration = getCourseDuration(course.duration);
  return (
    <>
        <article className="course-card">
            
            <h1 className="course-card-title">{course.title}</h1>
            <div className="course-card-content">
                <p className="course-card-description">{course.description}</p>
                <div className="course-card-info">
                    <div className="course-card-info-item">
                        <p className="course-card-authors"><span className="course-card-info-label">Authors:</span> {authorNames?.join(', ')}</p>
                        <p className="course-card-duration"><span className="course-card-info-label">Duration:</span> {formattedCourseDuration}</p>
                        <p className="course-card-creation-date"><span className="course-card-info-label">Created:</span> {formattedCreationDate}</p>
                    </div>
                    <div className="course-card-info-item">
                        <Button buttonText={BUTTON_TEXT.SHOW_COURSE} type="button" className="main-button course-card-button" />
                    </div>
                </div>
            </div>
        </article>
    </>
  );
};

export default CourseCard;
