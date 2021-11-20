import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NameSet from './NameSet/NameSet';
import Message from './Message/Message';
import './App.css';

const App = () => {
  let [name, changeName] = useState("");

  return(
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <NameSet giveName={changeName}/>
          </Route>
          <Route path="/message">
            <Message name={name}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
