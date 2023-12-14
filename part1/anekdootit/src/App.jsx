import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ content, votes }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p> {content}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const Winner = ({ votes, anecdotes }) => {
  const maxVotes = Math.max(...votes);
  console.log(maxVotes);
  console.log(maxVotes);
  const index = votes.indexOf(maxVotes);
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // states
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // functions
  const handleNextAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const handleVotes = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  return (
    <div>
      <Anecdote content={anecdotes[selected]} votes={votes[selected]} />
      <Button text={"vote"} handleClick={handleVotes} />
      <Button text={"next anecdote"} handleClick={handleNextAnecdote} />
      {votes.some((vote) => vote > 0) ? (
        <Winner votes={votes} anecdotes={anecdotes} />
      ) : (
        <p>No votes yet. Start voting anecdotes</p>
      )}
    </div>
  );
};

export default App;
