import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import NameSet from './NameSet/NameSet';
import Message from './Message/Message';

class App extends Component {
  state = {
    name: ""
  }

  applyname = (iname) => {
    this.setState({name: iname});
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <NameSet giveName={this.applyname}/>
          </Route>
          <Route path="/message">
            <Message name={this.state.name}/>
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
