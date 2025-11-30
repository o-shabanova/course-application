import React from 'react';
import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import {BUTTON_TEXT} from '../../constants';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import getAuthorsNames from '../../helpers/getAuthorsNames';
import { Link } from 'react-router-dom';

interface Author {
    id: string;
    name: string;
  }
  
  interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  }
  
  interface CoursesProps {
    courses: Course[];
    authors: Author[];
  }

const Courses: React.FC<CoursesProps> = ({courses, authors}) => {

  
  return (
    <div className="courses-container">
        <div className="courses-header">
            <SearchBar />
            <Link to="/courses/add">
              <Button 
                buttonText={BUTTON_TEXT.ADD_NEW_COURSE} 
                type="button" 
                className="main-button add-new-course-button"
              />
            </Link>
        </div>
        <ul className="courses-list">
            {courses.map((course) => (<li key={course.id} className="course-list-item">
                <CourseCard key={course.id} course={course} authorNames={getAuthorsNames(course.authors, authors)} />
                </li>
            ))}
        </ul>
    </div>
  );
};
export default Courses;
