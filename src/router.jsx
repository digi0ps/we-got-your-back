import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/routes/landing";
import Onboarding from "./components/routes/onboarding";
import Setup from "./components/routes/setup";
import Dashboard from "./components/routes/dashboard";

export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/onboarding">
          <Onboarding />
        </Route>

        <Route path="/setup">
          <Setup />
        </Route>

        <Route path="/dash">
          <Dashboard />
        </Route>

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}
