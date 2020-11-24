import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Feed from './Pages/Feed'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/feed' component={Feed} />
      </Switch>
    </Router>
  );
}

export default App;
