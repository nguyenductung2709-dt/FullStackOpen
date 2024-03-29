interface Total {
    totalExercises: number;
}

const Total = (props: Total) => {
    return (
        <p> Number of exercises {props.totalExercises} </p>
    )
}

export default Total