import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CommissionerMordan from "./commissionerMordan/CommissionerMordan";

ReactDOM.render(
  <Router>
    <CommissionerMordan />
  </Router>,
  document.getElementById("root")
);
