class Page {
    constructor(opt){
        this.page = opt.page;
        this.row = opt.row;
        this.count = opt.count;
        this.total = Math.ceil(opt.count / opt.row);
    }
}

module.exports = Page;