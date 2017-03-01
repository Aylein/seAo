const koa = require("koa");
const app = new koa();

const api = require("./api/api.js");

// app.use(ctx => {
//     ctx.body = "Hello World";
// });
console.log(api.routes());
app.use(api.routes()).use(api.allowedMethods());

app.listen(810);