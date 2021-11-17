import './App.css';
import NameSet from './NameSet/NameSet';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
let name = "";
function applyname(gname) {
  name=gname;
}
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <NameSet giveName={applyname}/>
          </Route>
          <Route path="/message">
            No Header{name}
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
