import "./Name.css";
import { useHistory } from 'react-router-dom';

function NameSet(props) {
    const history = useHistory();

    const sendName = () => {
        props.giveName(document.getElementById("setnameforminput").value);
        history.push("/message");
    }

    return (
        <div className="NameSet">
            <div className="setnameform" >
                <input type="text" id="setnameforminput" className="setnameform-input" placeholder="Username."/>
                <button className="setnameform-button" onClick={sendName}>Submit</button>
            </div>
        </div>
    );
}

export default NameSet;