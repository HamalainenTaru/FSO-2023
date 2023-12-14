import { useReducer } from "react";

const initialState = { good: 0, neutral: 0, bad: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "good":
      return { ...state, good: state.good + 1 };
    case "neutral":
      return { ...state, neutral: state.neutral + 1 };
    case "bad":
      return { ...state, bad: state.bad + 1 };
    default:
      throw new Error("Action type not found");
  }
};

const Statics = ({ state }) => {
  const { good, neutral, bad } = state;
  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = good * (100 / all);
  return (
    <div>
      <h2>statics</h2>

      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={all} />
            <StatisticLine text={"average"} value={average} />
            <StatisticLine text={"positive"} value={`${positive} %`} />
          </tbody>
        </table>
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>give feedback</h2>
      <Button text={"good"} handleClick={() => dispatch({ type: "good" })} />
      <Button
        text={"neutral"}
        handleClick={() => dispatch({ type: "neutral" })}
      />
      <Button text={"bad"} handleClick={() => dispatch({ type: "bad" })} />

      <Statics state={state} />
    </div>
  );
};
export default App;
