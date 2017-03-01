const router = new (require("koa-router"))({prefix: "api"});

router.get("/", ctx => {
    ctx.body = "this is the api index";
});

module.exports = router;