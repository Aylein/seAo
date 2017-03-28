import React from "react";
import ReactDom from "react-dom";
import {Router, browserHistory} from "react-router";
import routes from "./router/index.jsx";

ReactDom.render(<Router history={browserHistory} routes={routes}/>, document.getElementById("main"));