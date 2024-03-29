const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);
    return(
      <p><strong>total of {sum} exdercises</strong></p>
    )
  }

export default Total