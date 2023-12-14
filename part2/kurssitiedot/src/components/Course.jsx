const Header = () => <h1>Web development curriculum</h1>;

const CourseObject = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={course.parts} />
    </div>
  );
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <CourseObject key={course.id} course={course} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prev, current) => prev + current.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

export default function Course({ courses }) {
  return (
    <div>
      <Header />
      <Content courses={courses} />
    </div>
  );
}
