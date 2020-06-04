import React from "react";
import { BrowserRouter as MainRouter, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { Home } from "../screens";
import { HOME } from "./routes";

export const Router = (props) => {
  return (
    <MainRouter>
      <Switch>
        <Route path={HOME} exact component={Home} />
      </Switch>
    </MainRouter>
  );
};
