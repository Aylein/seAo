const {DB} = require("../util");
const uuid = require("node-uuid");
const Msg = require("./message.js");

class EF {
    constructor(constructor){
        this._constructor = constructor;
        this.db = new DB(constructor.name);
    }
    init(obj){
        obj = obj.constructor == this._constructor ? obj : new this._constructor(obj);
        obj.id = obj.id || uuid();
        obj.createTime = obj.createTime || new Date().toLocaleString();
        obj.updateTime = new Date().toLocaleString();
        return obj;
    }
    initRule(rule = {}){
        if(rule._id){
            if(rule._id.$in) rule._id.$in = rule._id.$in.map(va => this.db.ObjectID(va));
            else rule._id = this.db.ObjectID(rule._id);
        }
        return rule;
    }
    add(arr){
        return new Promise(resolve => {
            arr = Array.isArray(arr) ? arr.map(va => this.init(va)) : this.init(arr);
            this.db.insert(arr).then(res => { 
                resolve(new Msg(res.result.ok == 1, "", res.ops));
            });
        });
    }
    get(rule){
        return new Promise(resolve => {
            this.db.find(this.initRule(rule)).then(res => { resolve(new Msg(true, "", res)); }); 
        });
    }
    count(rule){
        return new Promise(resolve => {
            this.db.count(this.initRule(rule)).then(res => { resolve(new Msg(true, "", res)); }); 
        });
    }
    getOne(_id){
        return new Promise(resolve => {
            this.db.find(this.initRule({_id: _id})).then(res => { resolve(new Msg(true, "", res.page.count > 0 ? res.list[0] : null)); }); 
        });
    }
    update(rule, obj, opt){
        return new Promise(resolve => {
            let fn = (opt ? this.db.update.setOption(opt) : this.db.update).bind(this.db);
            let _obj = new this._constructor(Object.assign({}, obj));
            delete _obj._id;
            fn(this.initRule(rule), obj).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
    updateOne(obj, opt){
        return new Promise(resolve => {
            let fn = (opt ? this.db.update.setOption(opt) : this.db.update).bind(this.db);
            let _obj = new this._constructor(Object.assign({}, obj));
            delete _obj._id;
            fn(this.initRule({_id: obj._id}), _obj).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
    delete(rule){        
        return new Promise(resolve => {
            this.db.delete(this.initRule(rule)).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
    deleteOne(_id){
        return new Promise(resolve => {
            this.db.delete(this.initRule({_id: _id})).then(res => { resolve(new Msg(res.result.ok == 1, "", res)); });
        });
    }
}

module.exports = EF;