class IdGetter {
    constructor() {
        if (IdGetter.instance === undefined) {
            this.lastId = 0;
            IdGetter.instance = this;
        }
        else {
            returnIdGetter.instance
        }
    }
    getLastId() {return this.lastId}
    getNextId() {return this.lastId += 1}
}

export default IdGetter;