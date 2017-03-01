const koa = require("koa");
const app = new koa();

const api = require("./api");

app.use(api.routes()).use(api.allowedMethods());
app.use(ctx => {
    ctx.body = "Hello World";
});
app.jsonSpaces = 0;

app.listen(810);