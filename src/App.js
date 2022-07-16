import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Client from './pages/client';
import Main from './pages/Main';
import Product from './pages/product';
import Seller from './pages/seller';
import Sales from './pages/seller/Sales'
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
        <Route path="/seller/sales">
          <Sales />
        </Route>
        <Route path="/seller">
          <Seller />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
