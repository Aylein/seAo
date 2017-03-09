const router = new (require("koa-router"))({prefix: "/api/user"});
const User = require("../lib/user.js");

router.get("/", async ctx => {
    await User.getUserList(ctx.query).then(res => {
        ctx.body = JSON.stringify(res);
    });
});
router.post("/", async ctx => {
    await User.addUser(ctx.request.body).then(res => {
        ctx.body = JSON.stringify(res);
    });
});
router.post("/all", async ctx => {
    await User.addUsers(ctx.request.body).then(res => {
        ctx.body = JSON.stringify(res);
    });
});
router.get("/:id", async ctx => {
    await User.getUser(ctx.params.id).then(res => {
        ctx.body = JSON.stringify(res);
    });
});
router.delete("/", async ctx => {
    ctx.body = JSON.stringify(ctx.query);
    await User.deleteUsers(ctx.query.id).then(res => {
        ctx.body = JSON.stringify(res);
    })
});
router.delete("/:id", async ctx => {
    await User.deleteUser(ctx.params.id).then(res => {
        ctx.body = JSON.stringify(res);
    });
});

module.exports = router;