import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0, 
    2: 0, 
    3: 0, 
    4: 0, 
    5: 0
  });

  // function that gets the key with the highest value from an object
  const getKeyWithTheHighestValue = (object) => {
    let keys = Object.keys(object);
    keys.sort(function(a,b){
      return object[b] - object[a];
    });
    return keys[0];
  }

  // store the return value in the variable key
  const key = getKeyWithTheHighestValue(points);

  // this function randomly generate anecdotes
  const nextAnecdote = () => {
    const randValue = Math.floor(Math.random() * anecdotes.length);
    setSelected(randValue);
  }

  // this function votes for the active anecdote displayed
  const voteAnecdote = (selected) => {
    setPoints({...points,
      [selected]: points[selected] + 1
    })    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => voteAnecdote(selected)}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[key]}</p>
  <p>has {points[key]} votes</p>
    </div>
  )
}
 
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

