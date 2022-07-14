import {
    isSolutionValid,
    notValidCards,
    notValidCardsAboveIndex,
    haveCardsInSolutionUniqueSymbols,
    commonSymbolsBetweenArrays,
    areElementsOfArrayUnique, 
    allSymbolsRepeatDesiredNrOfTimes,
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


const A = 10;
const B = 11;
const C = 12;
const D = 13;
const E = 14;
const F = 15;
const G = 16;
const H = 17;

















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

const notValidCards_TC = [
    {
        input: [
                [1, 3],
                [1, 2],
                [2, 3]
            ],
        description: 'Should return 0 in case all cards have connections, and each symbol repeates only once between cards',
        expected: 0,
        testedFunction: () => input => notValidCards(input).length
    },
    {
        input: [
                [1, 3],
                [1, 2],
                [2, 1]
            ],
        description: 'Should return 1 in case one connection is doubled (3x2 instance)',
        expected: 1,
        testedFunction: () => input => notValidCards(input).length
    },
    {
        input: [
                [1, 3],
                [1, 2],
                [2, 3, 4],
                [1, 4]
            ],
        description: 'Should return 0 in case cards contain different numbers of symbols, but connections are single and exist)',
        expected: 0,
        testedFunction: () => input => notValidCards(input).length
    },    
    {
        input: [
                [1, 3, 5],
                [1, 2, 6],
                [2, 3, 4],
                [1, 4, 7]
            ],
        description: 'Should return 0 in case cards contain different numbers of symbols, but connections are single and exist, and there are dummy symbols in sollution)',
        expected: 0,
        testedFunction: () => input => notValidCards(input).length
    },
    {
        input: [
                [1, 3, 5],
                [1, 2, 6],
                [1, 2, 6],
                [1, 2, 6]
            ],
        description: 'Should return 2 in case 2 cards repete)',
        expected: 2,
        testedFunction: () => input => notValidCards(input,).length
    },
    {
        input: [
                [1, 2, 6],
                [1, 2, 6],
                [1, 2, 6],
                [1, 2, 6]
            ],
        description: 'Should return 3 card in case all cards repeat and total number of cards --- 4',
        expected: 3,
        testedFunction: () => input => {
            return notValidCards(input).length;
        }
    },
    {
        input: {
            index: 0,
            solution: [
                [ 1,   3,   5 ],
                [ 1,   2,   7 ],
                [ 3,   2,   4 ],
                [ 1,   4,   6 ],
                [ 2,   5,   6 ],
                [ 3,   6,   7 ],
                [ 4,   5,   7 ],
            ]
        },
        description: 'Should return 0 cards for a valid solution 7 x 3',
        expected: 0,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },
    {
        input: {
            index: 0,
            solution: [
                [ 1,   3,   5 ],
                [ 1,   2,   7 ],  
                [ 3,   2,   4 ],
                [ 1,   4,   6 ],  
                [ 2,   5,   6 ],
                [ 3,   6,   7 ],
                ]
        },
        description: 'Should return 0 cards for a valid solution 6 x 3',
        expected: 0,
        testedFunction: () => input => notValidCards(input.solution, input.index).length
    },


    {
        input: {
            index: 0,
            solution:[
                [ 1, 3, 5,  E],
                [ 1, 2, 7,  D,  F],
                [ 3, 2, 4,  8],
                [ 1, 4, 6],
                [ 2, 5, 6,  9],
                [ 3, 6, 7,  A,  G],
                [ 4, 5, 7,  B,  C],
                [ 1, 8, 9,  A,  B],
                [ 2, A, B,  C,  G],
                [ 3, 9, B,  D],
                [ 4, 9, E,  F,  G],
                [ 5, 8, D]
                ]
        },
        description: 'Testing manual sollution',
        expected: 0,
        testedFunction: () => input => {
           const solution = notValidCards(input.solution, input.index);
           return solution.length;
        }
    }
]

const allSymbolsRepeatDesiredNrOfTimes_TC = [
    {
        input: {
            solution: [
                [ 1,   3,   5 ],
                [ 1,   2,   7 ],
                [ 3,   2,   4 ],
                [ 1,   4,   6 ],
                [ 2,   5,   6 ],
                [ 3,   6,   7 ],
                [ 4,   5,   7 ],
               ]               
        },
        description: `Should return true in case each card has equal length and each symbol repeats exectly desired nr of times`,
        expected: true,
        testedFunction: () => ({ solution }) => {
            return allSymbolsRepeatDesiredNrOfTimes(solution)
        }
    },
    {
        input: {
            solution: [
                [ 1,   3,   5 ],
                [ 1,   2,   7 ],
                [ 3,   2,   4 ],
                [ 1,   4,   6 ],
                [ 2,   5,   6 ],
                [ 3,   6,   7 ],
               ]               
        },
        description: `Should return false in case all cards have connections to any other card, and they share only one common symbol, but symbols repeat not the same number of times`,
        expected: false,
        testedFunction: () => ({ solution }) => {
            return allSymbolsRepeatDesiredNrOfTimes(solution)
        }
    },
]


export {
    areElementsOfArrayUnique_TC,
    commonSymbolsBetweenArrays_TC,
    haveCardsInSolutionUniqueSymbols_TC ,
    notValidCards_TC,   
    allSymbolsRepeatDesiredNrOfTimes_TC,
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

