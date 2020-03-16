import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Dashboard from './components/dashboard/Dashboard'
// https://www.freefavicon.com/freefavicons/people/iconinfo/detective-152-298985.html


ReactDOM.render(<Dashboard />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
