const Header = ({ name }) => {
  return(
    <h2>{name}</h2>
  )
}

const Content = ({ parts }) => {
  return(
    <div>
    {parts.map(part => 
      <Part key={part.id} part = {part}/>
    )}
  </div>
  )
}

const Part = ({ part }) => {
  return(
    <p>{part.name} {part.exercises} </p>
  ) 
}

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);
  return(
    <p><strong>total of {sum} exdercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
      </>
  )
}

const Courses = ({ courses }) => {
  return (
    <>
    {courses.map(course => 
      <Course key = {course.id} course = {course}/>
    )}
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
  <h1>Web development curriculum</h1>
  <Courses courses={courses} />
  </>
  )
}

export default App