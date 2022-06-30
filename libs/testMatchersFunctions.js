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
}