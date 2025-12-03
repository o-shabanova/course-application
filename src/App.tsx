import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main className="main-container">
        <Routes>
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
           <Route 
            path="/" 
            element={
                <Navigate to="/courses" replace />
            } 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
