import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TimeClock from "./TimeClock/TimeClock";
import Timesheet from "./Timesheet/Timesheet";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/timesheets">
          <Timesheet />
        </Route>
        <Route path="/">
          <TimeClock />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
