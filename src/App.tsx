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
  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
  const [currentView, setCurrentView] = useState<'courses' | 'create'>('create');

  const handleCourseCreated = (course: Course) => {
    setCourses([...courses, course]);
    setCurrentView('courses');
  };

  return (
    <>
    <Header />
      <main className="main-container">
      {currentView === 'courses' ? (
      (courses.length > 0) ? (
        <Courses 
          courses={courses} 
          authors={mockedAuthorsList}
          onNavigateToCreate={() => setCurrentView('create')}
        />
      ) : (
        <EmptyCourseList />
      )
    ) : (
        <CreateCourse 
          title="Course Edit/Create Page"
          onCourseCreated={handleCourseCreated}
        />
        )}
      </main>
    </>
  );
}

export default App;
