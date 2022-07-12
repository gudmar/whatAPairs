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

export {
    getSymbolsArray_TC,
}