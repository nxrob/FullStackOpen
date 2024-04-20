const Header = ({ course: { name } }) => {
  return (<h1>{name}</h1>)
}

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part: { name, exercises } }) =>
  <p>
    {name} {exercises}
  </p>


const Content = ({ parts }) => {

  const sum = parts.reduce((total, part) => total + part.exercises, 0)
  
  return (
    <>
      {parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
      <b>Total parts in course: {sum}<br/></b>
    </>
  )
}

const Course = ({ course }) => {

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
    </>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <>
    {courses.map((course) => <Course course={course} />)}
    </>
  )
}

export default App