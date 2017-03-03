const code = {

}

class Message {
    constructor(res, msg, data){
        this.res = code[res] ? false : res;
        this.msg = msg || "ok";
        this.data = data || {}
    }
}

module.exports = Message;