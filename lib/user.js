 const {db} = require("../util");
 const uuid = require("node-uuid");
 const MainObj = require("./main.js");
 const Msg = require("./message.js");

 const find = db.find("user");
 const insert = db.insert("user");
 
 module.exports = class User extends MainObj{
    constructor(arr){
        super(arr);
        this._id = arr._id;
        this.id = arr.id || uuid();
        this.name = arr.name;
        this.createTime = new Date();
    }
    init(){
        if(!this.id) this.id = uuid();
    }
    static addUser(obj){
        return new Promise(resolve => { 
            let user = new User(obj);
            if(!user.name) resolve(new Msg(false, "用户名不能为空"));
            insert(user).then(res => { 
                resolve(new Msg(res.result.ok == 1, "", res.ops));
            });
        });
    }
    static getUserList(rule = {}){
        return new Promise(resolve => { 
            find(rule).then(res => { resolve(new Msg(true, null, res)); }); 
        });
    }
    static getUser(_id){
        return new Promise(resolve => {
            User.getUserList({_id: db.ObjectID(_id)}).then(res => { resolve(res); });
        });
    }
};