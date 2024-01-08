import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value} </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, bad, neutral } = props;
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good / all) * 100 + "%";

  if (all == 0) {
    return <div>No feedback given yet</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const increaseGoodByOne = () => {
    setAll(all + 1);
    setGood(good + 1);
  };
  const increaseNeutralByOne = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  };

  const increaseBadByOne = () => {
    setAll(all + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1> give feedback</h1>
      <Button onClick={increaseGoodByOne} text="good" />
      <Button onClick={increaseNeutralByOne} text="neutral" />
      <Button onClick={increaseBadByOne} text="bad" />
      <h1> statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
