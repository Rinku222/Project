import React from "react";
import Login from "./Components/LogIn";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Login login={true} />} />
          <Route path="/home" exact component={() => <Home />} />
          <Route
            path="/log-in"
            exact
            component={() => <Login login={false} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
