class MainObject{
    constructor(arr){
        arr = arr ? JSON.stringify(arr) : arr;
    }
    toJson(){ return JSON.parse(this); }
}

module.exports = MainObject;