import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) =>  {
  return (
    <input onClick={props.handleClick} type="button" value={props.value}/>
  )
}

const Statistic = (props) => {
  const {text, value} = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const all = good + bad + neutral;
  const average = (good * 1 + neutral * 0 + bad * -1)/all;
  const positive = `${(good / all) * 100} %`; 
  if (all === 0) {
    return(
      <div>No Feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic text="Average" value={average} />
        <Statistic text="Positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newGoodvalue) => {
    setGood(newGoodvalue)
  }

  const setToNeutral = (newNeutralValue) => {
    setNeutral(newNeutralValue)
  }

  const setToBad = (newBadValue) => {
    setBad(newBadValue)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="buttons">
        <Button handleClick={() => setToGood(good + 1)} value="good" />
        <Button handleClick={() => setToNeutral(neutral + 1)} value="neutral" />
        <Button handleClick={() => setToBad(bad + 1)} value="bad" />
      </div>
      <div id="statistics">
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral}  bad={bad} />
    </div>
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')
);
