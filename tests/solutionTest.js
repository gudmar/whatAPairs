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
        input: [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [7, 8, 9, 0]
        ],
        description: 'Should return true in case each array in sollution has unique symbols',
        expected: true,
        testedFunction: () => input => haveCardsInSolutionUniqueSymbols(input)
    },
    {
        input: [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [7, 8, 9, 7]
        ],
        description: 'Should return false in case an element in one of sollution arrays repeat',
        expected: false,
        testedFunction: () => input => haveCardsInSolutionUniqueSymbols(input)
    },    
]

const notValidCardsAboveIndex_TC = [
    {
        input: {
            index: 0,
            solution: [
                [1, 3],
                [1, 2],
                [2, 3]
            ]
        },
        description: 'Should return 0 in case all cards have connections, and each symbol repeates only once between cards',
        expected: 0,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },
    {
        input: {
            index: 0,
            solution: [
                [1, 3],
                [1, 2],
                [2, 1]
            ]
        },
        description: 'Should return 1 in case one connection is doubled (3x2 instance)',
        expected: 1,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },
    {
        input: {
            index: 0,
            solution: [
                [1, 3],
                [1, 2],
                [2, 3, 4],
                [1, 4]
            ]
        },
        description: 'Should return 0 in case cards contain different numbers of symbols, but connections are single and exist)',
        expected: 0,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },    
    {
        input: {
            index: 0,
            solution: [
                [1, 3, 5],
                [1, 2, 6],
                [2, 3, 4],
                [1, 4, 7]
            ]
        },
        description: 'Should return 0 in case cards contain different numbers of symbols, but connections are single and exist, and there are dummy symbols in sollution)',
        expected: 0,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },
    {
        input: {
            index: 0,
            solution: [
                [1, 3, 5],
                [1, 2, 6],
                [1, 2, 6],
                [1, 2, 6]
            ]
        },
        description: 'Should return 2 in case 2 cards repete)',
        expected: 2,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },
    {
        input: {
            index: 2,
            solution: [
                [1, 2, 6],
                [1, 2, 6],
                [1, 2, 6],
                [1, 2, 6]
            ]
        },
        description: 'Should return 1 card in case all cards are the same and index is set to last one -1',
        expected: 1,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    }


]

export {
    areElementsOfArrayUnique_TC,
    commonSymbolsBetweenArrays_TC,
    haveCardsInSolutionUniqueSymbols_TC ,
    notValidCardsAboveIndex_TC,   
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

