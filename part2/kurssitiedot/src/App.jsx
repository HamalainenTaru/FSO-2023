import Course from "./components/Course";
import courses from "./data";

const App = () => {
  return (
    <div>
      <Course courses={courses} />
    </div>
  );
};
export default App;
