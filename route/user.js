const Router = require("koa-router");
const User = require("../lib/user.js");
const React = require("react");
const ReactDOMServer  = require("react-dom/server");
const UserView = require("../src/user");

const makeRouter = () => {
    let router = new Router({prefix: "/user"});
    router.get("/", async ctx => {
        await User.get(ctx.query).then(res => {
            ctx.body = ReactDOMServer.renderToString(React.createFactory(UserView)({list: res.data.list}));
        });
    });
    return router;
};

module.exports = makeRouter();