const router = new (require("koa-router"))({prefix: "/api/user"});
const User = require("../lib/user.js");

router.get("/", async ctx => {
    await User.getUserList().then(res => {
        ctx.body = JSON.stringify(res);
    });
});
router.post("/", async ctx => {
    await User.addUser([{name: "a"}, {name: "b"}, {name: "c"}]).then(res => {
        ctx.body = JSON.stringify(res);
    });
});
router.get("/:id", async ctx => {
    await User.getUser(ctx.params.id).then(res => {
        ctx.body = JSON.stringify(res);
    })
});

module.exports = router;