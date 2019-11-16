import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Playlist from '../pages/Playlist';

const RoutesComponent = () => (
  <Switch>
    <Route path="/playlist/:id" component={Playlist} />
    <Route path="/" component={Home} />
  </Switch>
);

export default RoutesComponent;
