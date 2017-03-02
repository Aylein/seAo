 const {db} = require("../util");
 const uuid = require("node-uuid");
 const MainObj = require("./main.js");
 
 module.exports = class User extends MainObj{
    constructor(arr){
        super(arr);
        //this._id = arr._id;
        this.id = arr.id;
        this.name = arr.name;
    }
    init(){
        if(!this.id) this.id = uuid();
    }
    static makeCollect(){
        //return 
    }
    static addUser(arr){
        return new Promise(resolve => { 
            db.collect("user").then(col => {
                col.insert(arr).then(res => { resolve(res); });
            });
        });
    }
    static getUserList(rule = {}){
        return new Promise(resolve => { 
            db.find("user", rule).then(res => { resolve(res); });
        });
    }
    static getUser(_id){
        return new Promise(resolve => {
            console.log(JSON.stringify({_id: db.ObjectID(_id)}));
            User.getUserList({_id: db.ObjectID(_id)}).then(res => { resolve(res); });
        });
    }
};