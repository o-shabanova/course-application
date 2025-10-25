import React from 'react';
import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList, BUTTON_TEXT} from '../../constants';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

const Courses: React.FC = () => {
  return (
    <main className="courses-container">
        <div className="courses-header">
            <SearchBar />
            <Button buttonText={BUTTON_TEXT.ADD_NEW_COURSE} type="button" className="main-button add-new-course-button" />
        </div>
        <ul className="courses-list">
            {mockedCoursesList.map((course) => (
                <CourseCard key={course.id} course={course} authorNames={mockedAuthorsList.filter((author) => course.authors.includes(author.id)).map((author) => author.name)} />
            ))}
        </ul>
    </main>
  );
};
export default Courses;
