import { 
    countElementsOfArray, 
    allArrayElementsArePrimitive,
    ArrayElementsCounter,
} from './testMatchersFunctions.js'

// function arraysHaveSamePrimitiveElements(arr1, arr2) {
//     if (!allArrayElementsArePrimitive(arr1) || !allArrayElementsArePrimitive(arr2)) {
//         throw new Error('arraysHaveSamePrimitiveElements: all elements in both arrays should be primitive, and at least one is not')
//     }
//     if (arr1.length !== arr2.length) return false
//     const arr1Elements = countElementsOfArray(arr1);
//     const arr2Elements = countElementsOfArray(arr2);
//     if (Object.keys(arr1Elements).length !== Object.keys(arr2Elements).length) return false;
//     const nrOfDifferences = arr1Elements.reduce((acc, key) => {
//         if (arr1Elements[key] !== arr2Elements[key]) acc += 1;
//         return acc;
//     }, 0)
//     console.log(arr1, arr2, nrOfDifferences)
//     return nrOfDifferences === 0
// }

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
    console.log(arr1, arr2, nrOfDifferences)
    return nrOfDifferences === 0
}


export { arraysHaveSamePrimitiveElements }