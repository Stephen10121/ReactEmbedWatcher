import "./Message.css";

function Message(props) {
    return (
        <div className="Message">
            {props.name}
        </div>
    );
}

export default Message;