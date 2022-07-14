import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Client from './pages/client';
import Main from './pages/Main';
import Product from './pages/product';
import User from './pages/user';
import Dashboard from './pages/user/Dashboard';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/user/dashboard">
          <Dashboard />
        </Route>
        <Route path="/client">
          <Client />
        </Route>
        <Route path="/product">
          <Product />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
