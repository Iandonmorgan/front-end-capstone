import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CommissionerMordan from "./commissionerMordan/CommissionerMordan";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'



ReactDOM.render(
  <>
  <Router>
    <CommissionerMordan />
  </Router>
  </>,
  document.getElementById("root")
);
