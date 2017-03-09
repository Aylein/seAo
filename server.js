const koa = require("koa");
const bodyParser = require('koa-bodyparser');
const app = new koa();

const api = require("./api");
const user = require("./api/user");
const Client = require("./util/mongo.js");

app.use(bodyParser());
app.use(api.routes()).use(api.allowedMethods());
app.use(user.routes()).use(user.allowedMethods());
app.use(ctx => {
    let client = new Client("user");
    ctx.body = JSON.stringify(client);
});
app.jsonSpaces = 0;

app.listen(810);
console.log("now listening on port 810")