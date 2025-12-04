import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import { BUTTON_TEXT } from '../../constants';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import getAuthorsNames from '../../helpers/getAuthorsNames';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { setCourses } from '../../store/courses/coursesSlice';
import { setAuthors } from '../../store/authors/authorsSlice';
import { getCourses, getAuthors } from '../../services';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

const Courses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses);
  const authors = useSelector((state: RootState) => state.authors);

  useEffect(() => {
    const loadData = async () => {
      if (courses.length > 0 && authors.length > 0) {
        return;
      }

      try {
        if (courses.length === 0) {
          const fetchedCourses = await getCourses();
          dispatch(setCourses(fetchedCourses));
        }
        if (authors.length === 0) {
          const fetchedAuthors = await getAuthors();
          dispatch(setAuthors(fetchedAuthors));
        }
      } catch (error) {
        console.error('Failed to fetch courses or authors:', error);
      }
    };

    loadData();
  }, []);

  if (courses.length === 0) {
    return <EmptyCourseList />;
  }

  return (
    <div className="courses-container">
      <div className="courses-header">
        <SearchBar />
        <Link to="/courses/add">
          <Button
            buttonText={BUTTON_TEXT.CREATE_COURSE}
            type="button"
            className="main-button add-new-course-button"
          />
        </Link>
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
