const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name={props.part.name} exercise={props.part.exercises} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <>
        {props.name} {props.exercise}
      </>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <b>Number of exercises {props.total}</b>
    </>
  );
};

const Course = (props) => {
  const { courses } = props;
  const courseName = courses.name;
  const parts = courses.parts;
  const totalExercises = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  console.log("course props" + props);
  return (
    <>
      <Header course={courseName} />
      {parts.map((part) => (
        <p key={part.id}>
          <Content part={part} />
        </p>
      ))}
      <Total total={totalExercises} />
    </>
  );
};

export default Course;
