const koa = require("koa");
const bodyParser = require('koa-bodyparser');
const route = require("./route");
const Client = require("./util/mongo.js");

const start = () => {
    let app = new koa();
    app.use(bodyParser());
    Object.keys(route).forEach(va => { app.use(route[va].routes()).use(route[va].allowedMethods()); });
    app.use(ctx => { ctx.body = "Hello World !"; });

    app.jsonSpaces = 0;
    app.listen(810);
    console.log("now listening on port 810");
};

start();