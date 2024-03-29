import {Message} from './DiaryForm';
import '../css/Notification.css';

const Notification = (props: Message): JSX.Element => {
    return (
    <p className = {props.className}> {props.message} </p>
    );
}

export default Notification