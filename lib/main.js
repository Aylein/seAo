const {DB} = require("../util");
const uuid = require("node-uuid");
const Msg = require("./message.js");

class MainObject{
    constructor(arr){
        this._db = new DB(this.constructor.name);
        this._id = arr._id;
        this.id = arr.id;
        this.createTime = arr.createTime;
        this.updateTime = arr.updateTime;
    }
    init(){
        if(!this.id) this.id = uuid();
        if(!this.createTime) this.createTime = new Date();
        this.updateTime = new Date();
        return this;
    }
    static addUser(obj){
        return new Promise(resolve => { 
            let user = new this.constructor(obj).init();
            if(!user.name) resolve(new Msg(false, "用户名不能为空"));
            db.insert(user).then(res => { 
                resolve(new Msg(res.result.ok == 1, "", res.ops));
            });
        });
    }
    static addUsers(arr){
        return new Promise(resolve => { 
            arr = arr.map(va => new this.constructor(va).init())
            db.insert(arr).then(res => { 
                resolve(new Msg(res.result.ok == 1, "", res.ops));
            });
        });
    }
    static getUserList(rule = {}){
        return new Promise(resolve => {
            db.find(rule).then(res => { resolve(new Msg(true, "", res)); }); 
        });
    }
    static getUser(_id){
        return new Promise(resolve => {
            db.find({_id: db.ObjectID(_id)}).then(res => { resolve(new Msg(true, "", res)); }); 
        });
    }
    static updateUser(obj, opt){
        return new Promise(resolve => {
            let fn = opt ? db.update.setOption(opt) : db.update;
            fn({_id: db.ObjectID(obj._id)}, obj).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
    static deleteUser(_id){
        return new Promise(resolve => {
            db.delete({_id: db.ObjectID(_id)}).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
    static deleteUsers(_ids){
        return new Promise(resolve => {
            db.delete({_id: {$in: _ids.map(va => db.ObjectID(va))}}).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
}

module.exports = MainObject;