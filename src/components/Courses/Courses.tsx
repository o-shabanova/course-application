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

const Courses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses);
  const authors = useSelector((state: RootState) => state.authors);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCourses = await getCourses();
        const fetchedAuthors = await getAuthors();
        dispatch(setCourses(fetchedCourses));
        dispatch(setAuthors(fetchedAuthors));
      } catch (error) {
        console.error('Failed to fetch courses or authors:', error);
      }
    };

    loadData();
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
