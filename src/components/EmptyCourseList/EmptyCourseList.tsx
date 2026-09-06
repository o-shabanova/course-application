import React from 'react';
import { useSelector } from 'react-redux';
import { BUTTON_TEXT, USER_ROLE } from '../../constants';
import { Button } from '../../common/Button/Button';
import './EmptyCourseList.css';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

const EmptyCourseList:React.FC = () => {
    const role = useSelector((state: RootState) => state.user.role);
    const isAdmin = role.toLowerCase() === USER_ROLE.ADMIN;

    return (
        <main className="empty-course-list">
            <div className="empty-course-list-content">
                <h3 className="empty-course-list-title">Course List is Empty</h3>
                <p className="empty-course-list-description">Please use "Add New Course" button to add your first course</p>
                {isAdmin && (
                  <Link to="/courses/add">
                    <Button buttonText={BUTTON_TEXT.ADD_NEW_COURSE} type="button" className="main-button add-new-course-button" />
                  </Link>
                )}
            </div>
        </main>
    )
}
export default EmptyCourseList;