import "./Message.css";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';
const socket = socketio("https://www.gruzservices.com");
//const socket = socketio("http://192.168.0.24");

const Message = () => {
    const [name, changeName] = useState("");
    const [curtext, changeCurtext] = useState("");
    const [chat, changeChat] = useState([]);
    const [prevData, changePrevData] = useState("");
    const [history] = useState(useHistory());

    const onMessageSubmit = (e) => {
        e.preventDefault();
        if (name === "") {
            history.push("/");
        } else {
            socket.emit("message", {mName: name, mText: curtext});
            document.getElementById("sendmessinput").value = "";
        }
    }

    const addChat = (data) => {
        const newName = data.mName;
        const newMessage = data.mText;
        let chat2 = chat;
        chat2.push({cachedName: newName, cachedMessage: newMessage});
        changeChat(chat2);
    }

    const renderChat = () => {
        return chat.map((message, index) => (
            <div className="chatbox" key={index}>
                <p>{message.cachedName}</p><h4>{message.cachedMessage}</h4>
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

    const localGet = () => {
        if (localStorage.getItem("name") !== "") {
            changeName(localStorage.getItem("name"));
        } else {
            history.push("/");
        }
    }

    const onStartup = useRef(() => {});
    onStartup.current = () => {
        checkIncomingData();
        localGet();
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
                <input autoComplete="off" type="text" id="sendmessinput" onChange={(e)=>changeCurtext(e.target.value)} name="message" placeholder="Message:"/>
                <input  type="submit" value="Send"/>
            </form>
            <div className="goHome">
                <a href="/">Change Name</a>
            </div>
        </div>
    );
}

export default Message;