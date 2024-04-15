import { useState } from 'react'

let feedbackTally = 0;

const App = () => {

  const [positive, setPositive] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [negative, setNegative] = useState(0);
  const feedbackArray = [positive, neutral, negative]

  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const statisticsArray = [average, percentage]
  const statisticsProps = {feedbackArray, statisticsArray}

  const addFeedback = (type) => {

    feedbackTally++

    if (type == "positive") {
      const newAverage = (average*(feedbackTally-1)+1)/feedbackTally
      setAverage(newAverage)
      setPositive(positive + 1)
      setPercentage((newAverage+1)/2*100)
    }
    else if (type == "neutral") {
      const newAverage = (average*(feedbackTally-1))/feedbackTally
      setNeutral(neutral + 1)
      setAverage(newAverage)
      setPercentage((newAverage+1)/2*100)
    }
    else if (type == "negative") {
      const newAverage = (average*(feedbackTally-1)-1)/feedbackTally
      setNegative(negative + 1)
      setAverage(newAverage)
      setPercentage((newAverage+1)/2*100)
    }
  }

  return (
    <div>
      <h1>Cafe Feedback</h1>
      <Button handleClick={() => addFeedback("positive")} text="Positive" />
      <Button handleClick={() => addFeedback("neutral")} text="Neutral" />
      <Button handleClick={() => addFeedback("negative")} text="Negative" />
      <hr />
      <Statistics {...statisticsProps} />

    </div>
  )
}


const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ feedbackArray, statisticsArray }) => {
  
  if(feedbackArray[0] + feedbackArray[1] + feedbackArray[2] == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
        <StatisticsLine type={"positive"} feedbackArray={feedbackArray} statisticsArray={statisticsArray} />
        <StatisticsLine type={"neutral"} feedbackArray={feedbackArray} statisticsArray={statisticsArray} />
        <StatisticsLine type={"negative"} feedbackArray={feedbackArray} statisticsArray={statisticsArray} />
        <StatisticsLine type={"average"} feedbackArray={feedbackArray} statisticsArray={statisticsArray} />
        <StatisticsLine type={"percentage"} feedbackArray={feedbackArray} statisticsArray={statisticsArray} />
    </table>
  )

}

const StatisticsLine = ({type, feedbackArray, statisticsArray}) => {

  if(type == "positive") { return ( <tr><td>Positive:</td><td>{feedbackArray[0]}</td></tr> ) }
  if(type == "neutral") { return ( <tr><td>Neutral:</td><td>{feedbackArray[1]}</td></tr> ) }
  if(type == "negative") { return ( <tr><td>Negative:</td><td>{feedbackArray[2]}</td></tr> ) }
  if(type == "average") { return ( <tr><td>Average:</td><td>{statisticsArray[0]}</td></tr> ) }
  if(type == "percentage") { return ( <tr><td>Percentage:</td><td>{statisticsArray[1]}%</td></tr> ) }

}

export default App

