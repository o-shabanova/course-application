import { Header } from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { mockedCoursesList, mockedAuthorsList} from './constants';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';

function App() {
  return (
    <>
    <Header />
    {(mockedCoursesList.length > 0) ? <Courses courses={mockedCoursesList} authors={mockedAuthorsList} /> : <EmptyCourseList />}
    </>
  );
}

export default App;
