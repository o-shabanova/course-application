import { useState } from 'react';
import { Header } from './components/Header/Header';
// import Courses from './components/Courses/Courses';
// import { mockedCoursesList, mockedAuthorsList} from './constants';
// import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
// import { Registration } from './components/Registration/Registration';
// import Login from './components/Login/Login';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
  // const [currentView, setCurrentView] = useState<'registration' | 'login'>('registration');

  return (
    <>
    <Header />
    {/* {(mockedCoursesList.length > 0) ? <Courses courses={mockedCoursesList} authors={mockedAuthorsList} /> : <EmptyCourseList />} */}
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
       <CreateCourse title="Course Edit/Create Page"/>
    </main>
    </>
  );
}

export default App;
