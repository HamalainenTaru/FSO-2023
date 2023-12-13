const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const { part1, part2, part3, exercises1, exercises2, exercises3 } = props;
  return (
    <div>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </div>
  );
};

const Part = (props) => {
  const { part, exercises } = props;
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = (props) => {
  const total = props.exercises1 + props.exercises2 + props.exercises3;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};
export default App;
