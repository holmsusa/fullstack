const Header = ({course}) => {
    return (
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <div>
        <b>
          total of {parts.reduce((a, b) => 
            {return a + b.exercises}, 0)} exercises
        </b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course