import "./Message.css";
import React, { useState, useEffect, setState, Component } from "react";
import socketio from 'socket.io-client';
const socket = socketio("http://192.168.0.24:80");

class Message extends Component {
    state = {
        name: this.props.name,
        curtext: "",
        chat: [],
        prevData: ""
    }

    onTextChange = () => {
        this.setState({curtext: document.getElementById("sendmessinput").value});
    }

    onMessageSubmit = (e) => {
        e.preventDefault();
        if (this.state.name == "") {
            alert("You don't have a name. Go back home to get a name.");
        } else {
            socket.emit("message", `${this.state.name},${document.getElementById("sendmessinput").value}`);
        }
    }

    addChat = (data) => {
        console.log("1");
        const [newName, newMessage] = data.split(",");
        let chat2 = this.state.chat;
        chat2.push(`${newName}:${newMessage}`);
        this.setState({chat: chat2});
    }

    renderChat = () => {
        return this.state.chat.map((message, index) => (
            <div className="chatbox" key={index}>
                <h3>{message.split(":")[0]}:</h3><h4>{message.split(":")[1]}</h4>
            </div>
        ));
    }

    startSocket() {
        socket.on("message", (data) => {
            if (data!==this.state.prevData){
                this.addChat(data);
                this.setState({prevData: data});
            }
        });        
    }

    render() {
        return (
            <div className="Message">
                <div className="chat-part">
                    {this.startSocket()}
                    <div className="h1part"><h1>Chat Room</h1></div>
                    {this.renderChat()}
                </div>
                <form className="submitPart" onSubmit={this.onMessageSubmit}>
                    <input autocomplete="off" type="text" id="sendmessinput" name="message" placeholder="Message:"/>
                    <input  type="submit" value="Send"/>
                </form>
                <div className="goHome">
                    <a href="/">Go Home</a>
                </div>
            </div>
        );
    }
}

export default Message;