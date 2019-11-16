import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";

const RoutesComponent = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default RoutesComponent;
