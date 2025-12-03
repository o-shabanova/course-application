import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import { BUTTON_TEXT, API_BASE_URL } from '../../constants';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import getAuthorsNames from '../../helpers/getAuthorsNames';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { setCourses } from '../../store/courses/coursesSlice';
import { setAuthors } from '../../store/authors/authorsSlice';

const Courses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses);
  const authors = useSelector((state: RootState) => state.authors);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/all`);
        if (response.ok) {
          const data = await response.json();
          const courses = Array.isArray(data.result) ? data.result : [];
          dispatch(setCourses(courses));
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/authors/all`);
        if (response.ok) {
          const data = await response.json();
          const authors = Array.isArray(data.result) ? data.result : [];
          dispatch(setAuthors(authors));
        }
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      }
    };

    fetchCourses();
    fetchAuthors();
  }, [dispatch]);

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
