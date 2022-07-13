import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import App from './App';
import Client from './pages/client';
import Product from './pages/product';
import Dashboard from './pages/user/Dashboard';
import "./styles/global.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
        {/* <Route path="/">
        <Home />
      </Route> */}
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);

