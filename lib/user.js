const EF = require("./main.js");

class User {
    constructor(arr = {}){
        this.name = arr.name;

        this._id = arr._id;
        this.id = arr.id;
        this.createTime = arr.createTime;
        this.updateTime = arr.updateTime;
    }
};

module.exports = new EF(User);