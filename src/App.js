import './App.css';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import React from 'react';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';
import Login from './components/Login';

function App() {
  const isAuthenticated = false; // You can implement your authentication logic here

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/student" component={StudentHome} />
        <Route path="/schedule" component={ShowSchedule} />
        <Route path="/admin" component={AdminHome} />
        ) : (
          <Redirect to="/" />
        )}
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
