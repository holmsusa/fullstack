import { useState } from 'react'

const Header = ({header}) => (
  <h1>{header}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value, text2=""}) => (
  <>
    <td>{text}</td> 
    <td>{value} {text2}</td>
  </>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <p>No feedback given</p>
    );
  }
  return (
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={good}/></tr>
        <tr><StatisticLine text="neutral" value={neutral}/></tr>
        <tr><StatisticLine text="bad" value={bad}/></tr>
        <tr><StatisticLine text="all" value={good + bad + neutral}/></tr> 
        <tr><StatisticLine text="average" value={(good*1 + bad*(-1)) / (good+neutral+bad)}/></tr>
        <tr><StatisticLine text="positive" value={100*good / (good + neutral + bad)} text2="%"/></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // define event handlers
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log('Good now', updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log('Neutral now', updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log('Bad now', updatedBad)
  }

  return (
    <div>
      <Header header={"give feedback"}/>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header header={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App