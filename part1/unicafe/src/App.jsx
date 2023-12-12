import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <>
        <th> {text} </th>
        <th> {value} % </th>
      </>    
    )
  } else {
    return (
      <>
        <th> {text} </th>
        <th> {value} </th>
      </>
    )
  }
}


const Statistics = ({ good, neutral, bad, total, score}) => {
  if (total == 0) {
    return (
      <p> No feedback given </p>
    )
  }
  else {
  return (
    <>
    <table>
      <tbody>
    <tr><StatisticLine text = 'good' value = {good} /></tr>
    <tr><StatisticLine text = 'neutral' value = {neutral} /></tr>
    <tr><StatisticLine text = 'bad' value = {bad} /></tr>
    <tr><StatisticLine text = 'all' value = {total} /></tr>
    <tr><StatisticLine text = 'average' value = {score/total} /></tr>
    <tr><StatisticLine text = 'positive' value = {(good/total)*100} /></tr>
      </tbody>
    </table>
    </>
  )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)
  const handleGood = () => {
    setGood(good+1)
    setTotal(total+1)
    setScore(score+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
    setScore(score)
  }

  const handleBad = () => {
    setBad(bad+1)
    setTotal(total+1)
    setScore(score-1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} score = {score} />
    </div>
  )
}

export default App