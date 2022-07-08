import {
    isSolutionValid,
    notValidCards,
    notValidCardsAboveIndex,
    haveCardsInSolutionUniqueSymbols,
    commonSymbolsBetweenArrays,
    areElementsOfArrayUnique, 
} from '../helpers/solutionValidator.js';
import { arraysHaveSamePrimitiveElements } from '../libs/testMatchers.js';

// data, description, expected, testedFunction
const areElementsOfArrayUnique_TC = [
    {
        mockData: [1, 2, 3, 4, 5],
        description: 'Should return true if elemets of array are unique',
        expected: true,
        testedFunction: (data) => () => areElementsOfArrayUnique(data)
    },
    {
        mockData: [1, 2, 3, 4, 1],
        description: 'Should return false if one element in array repetes',
        expected: false,
        testedFunction: (data) => () => areElementsOfArrayUnique(data)
    }
]

const commonSymbolsBetweenArrays_TC = [
    {
        input: {
            arr1: [1, 2, 3, 4, 5],
            arr2: [6, 7, 8, 9]
        },
        description: 'Should return [] in case there are no common symbols betweeen arrays',
        testedFunction: () => (data) => {
            return commonSymbolsBetweenArrays(data.arr1, data.arr2)
        },
        expected: [],
        matcher: arraysHaveSamePrimitiveElements,
    },
    {
        input: {
            arr1: [1, 2, 3, 4, 5],
            arr2: [1, 0, 9, 8, 7]
        },
        testedFunction: () => (data) => {
            return commonSymbolsBetweenArrays(data.arr1, data.arr2)
        },
        description: 'Should return [1] in case only 1 repeates in arrays',
        expected: [1],
        matcher: arraysHaveSamePrimitiveElements,
    },
    {
        input: {
            arr1: [1, 2, 3, 4, 5],
            arr2: [1, 0, 9, 8, 5]
        },
        testedFunction: () => (data) => {
            return commonSymbolsBetweenArrays(data.arr1, data.arr2)
        },        
        description: 'Should return [1, 5] in case only 1 and 5 repeates in arrays',
        expected: [1, 5],
        matcher: arraysHaveSamePrimitiveElements,
    },
    {
        input: {
            arr1: [1, 2, 3, 4, 5],
            arr2: [1, 2, 3, 4, 5]
        },
        testedFunction: () => (data) => {
            return commonSymbolsBetweenArrays(data.arr1, data.arr2)
        },        
        description: 'Should return [1, 2, 3, 4, 5] in case all elements from both arrays match',
        expected: [1, 2, 3, 4, 5],
        matcher: arraysHaveSamePrimitiveElements,
    },
]

const haveCardsInSolutionUniqueSymbols_TC = [
    {
        data: [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [7, 8, 9, 0]
        ],
        description: 'Should return true in case each array in sollution has unique symbols',
        expected: true,
    },
    {
        data: [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [7, 8, 9, 7]
        ],
        description: 'Should return false in case an element in one of sollution arrays repeat',
        expected: true,
    },
    
]

export {
    areElementsOfArrayUnique_TC,
    commonSymbolsBetweenArrays_TC,
    haveCardsInSolutionUniqueSymbols_TC    
}




const solutionToTest = [
 [ 1,   3,   5 ],
 [ 1,   2,   7 ],
 [ 3,   2,   4 ],
 [ 1,   4,   6 ],
 [ 2,   5,   6 ],
 [ 3,   6,   7 ],
 [ 4,   5,   7 ],
]

