import { useState } from 'react';
import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { mockedCoursesList, mockedAuthorsList} from './constants';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { Author } from './helpers/getAuthorsNames';


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
  const [currentView, setCurrentView] = useState<'courses' | 'create'>('create');

  const handleCourseCreated = (course: Course) => {
    setCourses([...courses, course]);
    setCurrentView('courses');
  };

  const handleAuthorCreated = (author: Author) => {
    setAuthors([...authors, author]);
  };

  const handleAuthorDeleted = (authorId: string) => {
    setAuthors(authors.filter(a => a.id !== authorId));
  };

  return (
    <>
    <Header />
      <main className="main-container">
      {currentView === 'courses' ? (
      (courses.length > 0) ? (
        <Courses 
          courses={courses} 
          authors={authors}
          onNavigateToCreate={() => setCurrentView('create')}
        />
      ) : (
        <EmptyCourseList />
      )
    ) : (
        <CreateCourse 
          title="Course Edit/Create Page"
          onCourseCreated={handleCourseCreated}
          authors={authors}
          onAuthorCreated={handleAuthorCreated}
          onAuthorDeleted={handleAuthorDeleted}
        />
        )}
      </main>
    </>
  );
}

export default App;
