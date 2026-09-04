import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

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
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
           <Route
              path="/courses/:courseId"
              element={
              <PrivateRoute>
                  <CourseInfo />
              </PrivateRoute>
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
        </Routes>
      </main>
    </>
  );
}

export default App;
