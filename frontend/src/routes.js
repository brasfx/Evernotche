import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import AddNote from './pages/AddNote';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/addnote" component={AddNote} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
