import "./Name.css";
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";

const NameSet = (props) => {
    const [name, setName] = useState("");
    const history = useHistory();

    const sendName = () => {
        props.giveName(name);
        localStorage.setItem("name", name);
        history.push("/message");
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            sendName();
        }
    }

    return (
        <div className="NameSet">
            <div className="setnameform" >
                <input type="text" id="setnameforminput" className="setnameform-input" placeholder="Username." onKeyPress={handleKeyPress} onChange={(e) => setName(e.target.value)}/>
                <button className="setnameform-button" onClick={sendName}>Submit</button>
            </div>
        </div>
    );
}

export default NameSet;