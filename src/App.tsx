import { useState } from 'react';
import { Header } from './components/Header/Header';
// import Courses from './components/Courses/Courses';
// import { mockedCoursesList, mockedAuthorsList} from './constants';
// import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import { Registration } from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
  const [currentView, setCurrentView] = useState<'registration' | 'login'>('registration');

  return (
    <>
    <Header />
    {/* {(mockedCoursesList.length > 0) ? <Courses courses={mockedCoursesList} authors={mockedAuthorsList} /> : <EmptyCourseList />} */}
    <main className="main-container">
       {currentView === 'registration' ? (
         <Registration 
           title="Registration" 
           onSubmit={() => {}} 
           onNavigateToLogin={() => setCurrentView('login')}
         />
       ) : (
         <Login onNavigateToRegistration={() => setCurrentView('registration')} />
       )}
    </main>
    </>
  );
}

export default App;
