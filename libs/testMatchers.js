import { 
    countElementsOfArray, 
    allArrayElementsArePrimitive,
    ArrayElementsCounter,
    isPrimitive,
    areObjectsEqual,

} from './testMatchersFunctions.js'

function arraysHaveSamePrimitiveElements(arr1, arr2) {
    if (!allArrayElementsArePrimitive(arr1) || !allArrayElementsArePrimitive(arr2)) {
        throw new Error('arraysHaveSamePrimitiveElements: all elements in both arrays should be primitive, and at least one is not')
    }
    if (arr1.length !== arr2.length) return false
    const arr1Elements = new ArrayElementsCounter(arr1);
    const arr2Elements = new ArrayElementsCounter(arr2);
    if (arr1Elements.keys().length !== arr2Elements.keys().length) return false;
    const nrOfDifferences = arr1Elements.keys().reduce((acc, key) => {
        if (arr1Elements.get(key) !== arr2Elements.get(key)) acc += 1;
        return acc;
    }, 0)
    return nrOfDifferences === 0
}

function objectsEqual(obj1, obj2) {
    console.log(obj1, obj2, isPrimitive(obj1), obj1 === obj2)
    if (isPrimitive(obj1)) return obj1 === obj2;
    return areObjectsEqual(obj1, obj2);
}


export { arraysHaveSamePrimitiveElements, objectsEqual }