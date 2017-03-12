const Router = require("koa-router");
const User = require("../../lib/user.js");

const makeRouter = () => {
    let router = new Router({prefix: "/api/user"});
    router.get("/", async ctx => {
        await User.get(ctx.query).then(res => {
            ctx.body = JSON.stringify(res);
        });
    });
    router.get("/:id", async ctx => {
        await User.getOne(ctx.params.id).then(res => {
            ctx.body = JSON.stringify(res);
        });
    });
    router.post("/", async ctx => {
        await User.add(ctx.request.body).then(res => {
            ctx.body = JSON.stringify(res);
        });
    });
    router.put("/", async ctx => {
        await User.updateOne(ctx.request.body).then(res => {
            ctx.body = JSON.stringify(res);
        });
    });
    router.delete("/:id", async ctx => {
        await User.deleteOne(ctx.params.id).then(res => {
            ctx.body = JSON.stringify(res);
        });
    });
    return router;
};

module.exports = makeRouter();