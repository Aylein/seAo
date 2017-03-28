const Menu = {
    app: (nextState, callback) => { require.ensure([], require => { callback(null, require("../app.jsx").default); }, "app"); },
    index: (nextState, callback) => { require.ensure([], require => { callback(null, require("../view/index.jsx").default); }, "index"); },
    user: (nextState, callback) => { require.ensure([], require => { callback(null, require("../view/user.jsx").default); }, "user"); },
    over: (nextState, callback) => { require.ensure([], require => { callback(null, require("../view/over.jsx").default); }, "over"); }
};

export default {
    path: "/",
    getComponent: Menu.app,
    indexRoute: {getComponent: Menu.index},
    childRoutes: [
        {path: "/user", getComponent: Menu.user, childRoutes: [
            {path: ":user", getComponet: Menu.user}
        ]},
        {path: "/over", getComponent: Menu.over}
    ]
};