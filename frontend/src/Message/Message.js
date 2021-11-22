import "./Message.css";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';
const socket = socketio("https://www.gruzservices.com");

const Message = (props) => {
    const [name] = useState(props.name);
    const [curtext, changeCurtext] = useState("");
    const [chat, changeChat] = useState([]);
    const [prevData, changePrevData] = useState("");
    const [history] = useState(useHistory());

    const onMessageSubmit = (e) => {
        e.preventDefault();
        if (name === "") {
            history.push("/");
        } else {
            socket.emit("message", `${name},${curtext}`);
            document.getElementById("sendmessinput").value = "";
        }
    }

    const addChat = (data) => {
        const [newName, newMessage] = data.split(",");
        let chat2 = chat;
        chat2.push(`${newName}:${newMessage}`);
        changeChat(chat2);
    }

    const renderChat = () => {
        return chat.map((message, index) => (
            <div className="chatbox" key={index}>
                <h3>{message.split(":")[0]}:</h3><h4>{message.split(":")[1]}</h4>
            </div>
        ));
    }

    const checkIncomingData = () => {
        socket.on("message", (data) => {
            if (data !== prevData){
                addChat(data);
                changePrevData(data);
                var objDiv = document.getElementById("chat-part");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        });
    }

    const onStartup = useRef(() => {});
    onStartup.current = () => {
        checkIncomingData();
    }

    useEffect(() => {
        onStartup.current();
    }, []);

    return (
        <div className="Message">
            <div className="chat-part" id="chat-part">
                <div className="h1part"><h1>Chat Room</h1></div>
                {renderChat()}
            </div>
            <form className="submitPart" onSubmit={onMessageSubmit}>
                <input autocomplete="off" type="text" id="sendmessinput" onChange={(e)=>changeCurtext(e.target.value)} name="message" placeholder="Message:"/>
                <input  type="submit" value="Send"/>
            </form>
            <div className="goHome">
                <a href="/">Go Home</a>
            </div>
        </div>
    );
}

export default Message;