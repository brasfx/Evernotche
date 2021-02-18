import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import AddNote from './pages/AddNote';
import ViewNotes from './pages/ViewNotes';
import Support from './pages/Support';
import ShowNote from './pages/ShowNote';
//import Teste from './pages/Teste';
//import { history } from './history';
import NotFound from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';
import RecoverPassword from './pages/RecoverPassword';

export default function Routes() {
  const history = useHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/addnote" component={AddNote} />
        <PrivateRoute exact path="/viewnotes" component={ViewNotes} />
        <PrivateRoute exact path="/note/:id" component={ShowNote} />
        <PrivateRoute exact path="/support" component={Support} />
        <Route exact path="/recover-password" component={RecoverPassword} />
        <Route exact path="/" component={Login} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
}
