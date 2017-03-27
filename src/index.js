import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import App from "./app.jsx";
import Index from "./view/index.jsx";
import Over from "./view/over.jsx";
import User from "./view/user.jsx";

ReactDom.render(<Router history={browserHistory}>
    <route path="/" getComponent={(nextState, cb) => { require.ensure([], require => { cb(null, App); }, "App"); }}>
        <IndexRoute getComponent={(nextState, cb) => { require.ensure([], require => { cb(null, Index); }, "Index"); }}/>
        <route path="user" getComponent={(nextState, cb) => { require.ensure([], require => { cb(null, User); }, "User"); }}>
            <route path=":user" getComponent={(nextState, cb) => { require.ensure([], require => { cb(null, User); }, "User"); }}/>
        </route>
        <route path="Over" getComponent={(nextState, cb) => { require.ensure([], require => { cb(null, Over); }, "Over"); }}/>
    </route>
</Router>, document.getElementById("main"));