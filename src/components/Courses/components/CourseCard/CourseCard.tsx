import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import { BUTTON_TEXT, isAdminRole } from '../../../../constants';
import formatCreationDate from '../../../../helpers/formatCreationDate';
import getCourseDuration from '../../../../helpers/getCourseDuration';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../store';
import { Course } from '../../../../store/courses/coursesSlice';
import { removeCourse } from '../../../../store/courses/thunk';

interface CourseCardProps {
  course: Course;
  authorNames?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, authorNames = '' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector((state: RootState) => state.user.role);
  const isAdmin = isAdminRole(role);

  if (!course) {
    return null;
  }

  const handleDelete = () => {
    dispatch(removeCourse(course.id));
  };

  const formattedCreationDate = formatCreationDate(course.creationDate);
  const formattedCourseDuration = getCourseDuration(course.duration);

  return (
    <article className="course-card">
      <h1 className="course-card-title">{course.title}</h1>
      <div className="course-card-content">
        <p className="course-card-description">{course.description}</p>
        <div className="course-card-info">
          <div className="course-card-info-item">
            <p className="course-card-authors"><span className="course-card-info-label">Authors:</span> {authorNames}</p>
            <p className="course-card-duration"><span className="course-card-info-label">Duration:</span> {formattedCourseDuration}</p>
            <p className="course-card-creation-date"><span className="course-card-info-label">Created:</span> {formattedCreationDate}</p>
          </div>
          <div className="course-card-info-item">
            <Link to={`/courses/${course.id}`}>
              <Button buttonText={BUTTON_TEXT.SHOW_COURSE}
                type="button"
                className="main-button course-card-button"
              />
            </Link>
          </div>
          {isAdmin && (
            <div className="course-card-info-item">
              <Button
                buttonText={BUTTON_TEXT.DELETE_COURSE}
                type="button"
                className="main-button course-card-button delete"
                onClick={handleDelete}
              />
              <Link to={`/courses/update/${course.id}`}>
                <Button
                  buttonText={BUTTON_TEXT.UPDATE_COURSE}
                  type="button"
                  className="main-button course-card-button update"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
