const Router = require("koa-router");

const makeRouter = () => {
    let router = new Router({prefix: "/api"});
    router.get("/", ctx => {
        ctx.body = "this is the api index";
    });
    return router;
};

const apiUser = require("./user.js");

module.exports = {api: makeRouter(), apiUser};