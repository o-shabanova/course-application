import { useState } from 'react';
import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { mockedCoursesList, mockedAuthorsList} from './constants';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { Author } from './helpers/getAuthorsNames';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import CourseInfo from './components/CourseInfo/CourseInfo';



interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

function App() {

  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
  const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);

  const handleCourseCreated = (course: Course) => {
    setCourses([...courses, course]);
  };

  const handleAuthorCreated = (author: Author) => {
    setAuthors([...authors, author]);
  };

  const handleAuthorDeleted = (authorId: string) => {
    setAuthors(authors.filter(a => a.id !== authorId));
  };

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
                {courses.length > 0 ? (
                  <Courses 
                    courses={courses} 
                    authors={authors}
                  />
                ) : (
                  <EmptyCourseList />
                )}
              </PrivateRoute>
            }
          />
           <Route
              path="/courses/:courseId"
              element={
              <PrivateRoute>
                  <CourseInfo 
                    courses={courses} 
                    authors={authors} 
                  />
              </PrivateRoute>
            }
          />

          <Route
            path="/courses/add"
            element={
              <PrivateRoute>
                <CreateCourse 
                  onCourseCreated={handleCourseCreated}
                  authors={authors}
                  onAuthorCreated={handleAuthorCreated}
                  onAuthorDeleted={handleAuthorDeleted}
                />
              </PrivateRoute>
            }
          />
           <Route 
            path="/" 
            element={
              localStorage.getItem('token') ? (
                <Navigate to="/courses" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
