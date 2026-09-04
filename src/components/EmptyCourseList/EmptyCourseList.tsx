import React from 'react';
import { BUTTON_TEXT } from '../../constants';
import { Button } from '../../common/Button/Button';
import './EmptyCourseList.css';
import { Link } from 'react-router-dom';

const EmptyCourseList:React.FC = () => {
    return (
        <main className="empty-course-list">
            <div className="empty-course-list-content">
                <h3 className="empty-course-list-title">Course List is Empty</h3>
                <p className="empty-course-list-description">Please use "Add New Course" button to add your first course</p>
                <Link to="/courses/add">
                  <Button buttonText={BUTTON_TEXT.ADD_NEW_COURSE} type="button" className="main-button add-new-course-button" />
                </Link>
            </div>
        </main>
    )
}
export default EmptyCourseList;