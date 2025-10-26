import React from 'react';
import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import {BUTTON_TEXT} from '../../constants';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

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
    <main className="courses-container">
        <div className="courses-header">
            <SearchBar />
            <Button buttonText={BUTTON_TEXT.ADD_NEW_COURSE} type="button" className="main-button add-new-course-button" />
        </div>
        <ul className="courses-list">
            {courses.map((course) => (<li key={course.id} className="course-list-item">
                <CourseCard key={course.id} course={course} authorNames={authors.filter((author) => course.authors.includes(author.id)).map((author) => author.name)} />
                </li>
            ))}
        </ul>
    </main>
  );
};
export default Courses;
