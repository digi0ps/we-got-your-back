import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/landing";
import Onboarding from "./components/onboarding";
import Setup from "./components/setup";

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

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}
