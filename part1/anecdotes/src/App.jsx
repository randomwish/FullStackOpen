import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;
    console.log(arr)
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
  }
 
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [ary, setAry] = useState(Array(anecdotes.length).fill(0))
  const [maxVal, setMaxVal] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)


  const changeAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  const incrementVote = () => {
    const changedAry = { ...ary}
    changedAry[selected] += 1
    const maxVal = Math.max(...Object.values(changedAry))
    const valuesArray = Object.values(changedAry)

    const maxIndex = indexOfMax(valuesArray)
  

    setAry(changedAry)
    setMaxIndex(maxIndex)
    setMaxVal(maxVal)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
      {anecdotes[selected]}
      </p>
      <p> has {ary[selected]} votes</p>
      <Button text="vote" onClick={incrementVote} />
      <Button text="Change Anecdote!" onClick={changeAnecdote} />

      <h1> Anecdote with most votes has {maxVal} votes</h1>
      <p>{anecdotes[maxIndex]}</p>

    </div>
  )
}

export default App