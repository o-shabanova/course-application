import React from 'react';
import { useSelector } from 'react-redux';
import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import { BUTTON_TEXT, isAdminRole } from '../../constants';
import Button from '../../common/Button/Button';
import getAuthorsNames from '../../helpers/getAuthorsNames';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import SearchBar from './components/SearchBar/SearchBar';

const Courses: React.FC = () => {
  const courses = useSelector((state: RootState) => state.courses);
  const authors = useSelector((state: RootState) => state.authors);
  const role = useSelector((state: RootState) => state.user.role);
  const isAdmin = isAdminRole(role);

  if (!role) {
    return null;
  }

  if (courses.length === 0) {
    return <EmptyCourseList />;
  }

  return (
    <div className="courses-container">
      <div className="courses-header">
        <SearchBar />
        {isAdmin && (
          <Link to="/courses/add">
            <Button
              buttonText={BUTTON_TEXT.ADD_NEW_COURSE}
              type="button"
              className="main-button add-new-course-button"
            />
          </Link>
        )}
      </div>
      <ul className="courses-list">
        {courses.map((course) =>
        (<li key={course.id} className="course-list-item">
          <CourseCard
            key={course.id}
            course={course}
            authorNames={getAuthorsNames(course.authors, authors)}
          />
        </li>
        ))}
      </ul>
    </div>
  );
};
export default Courses;
