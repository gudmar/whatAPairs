import CardsGenerator from '../helpers/solutionGenerator.js'

import { arraysHaveSamePrimitiveElements } from '../libs/testMatchers.js';

const getSymbolsArray_TC = [
    {
        mockData: null,
        beforeEachData: {
            desiredNrOfCards: 5,
        },
        description: 'Expect to generate an 10 elemets array [0..9] when called with nrOfSymbols equal to 10',
        expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        input: 10,
        beforeEach: ({desiredNrOfCards}) => {
            const testedObject = new CardsGenerator(desiredNrOfCards);
            return { testedInstance: testedObject }
        },
        testedFunction: (mackData, beforeEachData) => {
            return beforeEachData.testedInstance.getSymbolsArray;
        },
        matcher: arraysHaveSamePrimitiveElements
    },
    {
        mockData: null,
        description: 'Expect to generate an 3 elemets array [0..2] when called with nrOfSymbols equal to 3',
        expected: [0, 1, 2],
        input: 3,
        testedFunction: (data, beforeEachData) => {
            return beforeEachData.testedInstance.getSymbolsArray;
        },
        matcher: arraysHaveSamePrimitiveElements
    }
]

const getFirstNotRestrictedSymbol_TC = [
    {
        beforeEachData: {
            desiredNrOfCards: 5
        },
        beforeEach: ({desiredNrOfCards}) => {
            const testedObject = new CardsGenerator(desiredNrOfCards);
            return { testedInstance: testedObject }
        },
        description: 'Expected to return 0 in case symbols are 0..10, restricted symbols array starts from 2',
        mockData: {
            symbols: [0,1,2,3,4,5,6,7,8,9,10],
            restrictedSymbols: {2:true,3:true, 4:true, 6:true}
        },
        input: null,
        expected: 0,

        testedFunction: ({symbols, restrictedSymbols}, { testedInstance }) => {
            testedInstance.symbols = symbols;
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return testedInstance.getFirstNotRestrictedSymbol.bind(testedInstance)
        },
    },
    {
        description: 'Expected to return 4 in case symbols are 0..9, restricted symbols array starts from 0 and lacks 4, 5, 9',
        mockData: {
            symbols: [0,1,2,3,4,5,6,7,8,9],
            restrictedSymbols: {0:true,1:true,2:true,3:true, 6:true, 7:true, 8:true}
        },
        input: null,
        expected: 4,

        testedFunction: ({symbols, restrictedSymbols}, { testedInstance }) => {
            testedInstance.symbols = symbols;
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return testedInstance.getFirstNotRestrictedSymbol.bind(testedInstance)
        },
    },
    {
        description: 'Expected to return 5 in case symbols are 0..5, restricted symbols array starts from 0 and lacks 5',
        mockData: {
            symbols: [0,1,2,3,4,5],
            restrictedSymbols: {0:true,1:true,2:true,3:true, 4:true}
        },
        input: null,
        expected: 5,

        testedFunction: ({symbols, restrictedSymbols}, { testedInstance }) => {
            testedInstance.symbols = symbols;
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return testedInstance.getFirstNotRestrictedSymbol.bind(testedInstance)
        },
    },
]

export {
    getSymbolsArray_TC,
    getFirstNotRestrictedSymbol_TC,
}