import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { Licoes } from "./pages/Licoes";
import { Licao } from "./pages/Licao";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/licoes" component={Licoes} exact />
      <Route path="/licoes/:licaoId" component={Licao} />
    </BrowserRouter>
  );
};

export default Routes;
