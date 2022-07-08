class ArrayElementsCounter {
    constructor(arr){
        this.mapObj = new Map();
        arr.forEach(item => this.mapObj.has(item) ? this.mapObj.set(item, this.mapObj.get(item) + 1):this.mapObj.set(item, 1));
    }
    log() {
        const output = [];
        this.mapObj.forEach((value, key) => output.push([key, value]))
        console.log(output);
    }
    keys(){
        const output = [];
        const keys = this.mapObj.keys();
        for(let key of keys) {
            output.push(key)
        }
        return output
    }
    values() {
        const output = [];
        const values = this.mapObj.values();
        for(let val of values) {
            output.push(val)
        }
        return output        
    }
    get(key) {
        return this.mapObj.get(key);
    }
}

function isPrimitive(val) {
    const primitiveTypes = ['string', 'number', 'bigint', 'boolean', 'symbol'];
    const valType = typeof val;
    return primitiveTypes.find(type => valType === type)
}

function allArrayElementsArePrimitive(arr) {
    return arr.reduce((item, acc) => {
        if (!isPrimitive(item)) acc = false;
        return acc;
    }, true)
}

function countElementsOfArray(arr) {
    return arr.reduce((acc, item) => {
        if (acc[item] === undefined) acc[item] = 1 
        else acc += 1;
        return acc
    }, {})
}

export { 
    countElementsOfArray,
    isPrimitive,
    allArrayElementsArePrimitive,
    ArrayElementsCounter,
}