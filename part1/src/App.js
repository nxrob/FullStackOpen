const App = () => {

  const var1 = 'Nico'
  const var2 = '23'

  return (
    <div>
      <Hello name={var1} age={var2} />
    </div>
  )
}

const Hello = (props) => {

  console.log(props)

  return (
    <h1>Hi, {props.name}! You are {props.age} years old.</h1>
  )
}

export default App