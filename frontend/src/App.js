import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NameSet from './NameSet/NameSet';
import Message from './Message/Message';
import './App.css';

const App = () => {

  return(
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <NameSet />
          </Route>
          <Route path="/message">
            <Message />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
