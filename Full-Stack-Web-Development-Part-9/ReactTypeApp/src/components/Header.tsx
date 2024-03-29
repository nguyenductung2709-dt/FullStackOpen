interface Header {
    courseName: string;
}

const Header = (props: Header) => {
    return (
        <h1> {props.courseName} </h1>
    )
}

export default Header