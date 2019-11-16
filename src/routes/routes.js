import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Playlist from '../pages/Playlist';
import Single from '../pages/Single';

const RoutesComponent = () => (
  <Switch>
    <Route path="/playlist/:id" component={Playlist} />
    <Route path="/track/:id" component={Single} />
    <Route path="/" component={Home} />
  </Switch>
);

export default RoutesComponent;
