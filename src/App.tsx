import { useState } from 'react';
import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { mockedCoursesList, mockedAuthorsList} from './constants';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import CreateCourse from './components/CreateCourse/CreateCourse';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

function App() {
    // const [currentView, setCurrentView] = useState<'registration' | 'login'>('registration');
  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);

  const handleCourseCreated = (course: Course) => {
    setCourses([...courses, course]);
  };

  return (
    <>
    <Header />
    {/* {(courses.length > 0) ? <Courses courses={courses} authors={mockedAuthorsList} /> : <EmptyCourseList />} */}
    <main className="main-container">
        {/* {currentView === 'registration' ? (
         <Registration 
           title="Registration" 
           onNavigateToLogin={() => setCurrentView('login')}
         />
       ) : (
         <Login 
         title='Login'
         onNavigateToRegistration={() => setCurrentView('registration')} />
       )} */}

       <CreateCourse 
         title="Course Edit/Create Page"
         onCourseCreated={handleCourseCreated}
       />
    </main>
    </>
  );
}

export default App;
