import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CourseForm/CourseForm';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { loadCourses } from './store/courses/thunk';
import { loadAuthors } from './store/authors/thunk';
import { loadCurrentUser } from './store/user/thunk';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(loadCurrentUser());
  }, [token, dispatch]);

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    dispatch(loadCourses());
    dispatch(loadAuthors());
  }, [isAuth, dispatch]);

  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
        <Route 
            path="/" 
            element={
                isAuth ? (
                  <Navigate to="/courses" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses"
            element={
              isAuth ? <Courses /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/courses/add"
            element={
              <PrivateRoute>
                <CreateCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/update/:courseId"
            element={
              <PrivateRoute>
                <CreateCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              isAuth ? <CourseInfo /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
