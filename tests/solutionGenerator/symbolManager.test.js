import CardsGenerator from '../../helpers/solutionGenerator.js'

import Mocker from '../../libs/mockClass.js'
import { arraysHaveSamePrimitiveElements } from '../../libs/testMatchers.js';
import RestrictedSymbolsManager from '../../helpers/solutionGenerator/symbolManager.js';

const alignWithSolutionAndAddedCard_TC = [
    {
        mockData: {
            allSymbolsCounted:{
                '1':2,
                '2':2,
                '3':3,
                '4': 2,
                '5':1,
                '6':1,
            }, 
            countAllSymbols: function() {return this.allSymbolsCounted},
            symbolRepetitions: {
                // all symbols counterd
            },
            solution: [
                [1, 2, 3],
                [1, 4, 5],
                [2, 4, 6]
            ],
            addedCard:[1]
        },
        beforeEachData: {/*constructor data*/ desiredNrOfCards: 4},
        description: 'Expect to properly calculate restricted symbols when each symbol repeats less then desiredNmberOfTimes',
        expected: [1, 2, 3, 4, 5],
        input: null,
        beforeEach: ({desiredNrOfCards}) => {return {testedInstance: new RestrictedSymbolsManager(desiredNrOfCards)}},
        testedFunction: (mockData, beforeEachData) => {
            const mocked = new Mocker();
            mocked.mockParam('allSymbolsCounted', mockData.allSymbolsCounted);
            mocked.mockParam('symbolRepetitions', mockData.allSymbolsCounted);
            mocked.mockParam('solution', mockData.solution);
            mocked.mockMethod('countAllSymbols', mockData.countAllSymbols)
            beforeEachData.testedInstance.alignWithSolutionAndAddedCard(mocked, mockData.addedCard)
            return () =>  Object.keys(beforeEachData.testedInstance._restrictedSymbols).map(s => parseInt(s));
        },
        matcher: arraysHaveSamePrimitiveElements
    },
    {
        mockData: {
            allSymbolsCounted:{
                '1':4,
                '2':2,
                '3':3,
                '4': 2,
                '5':1,
                '6':1,
                '7':1,
                '8':1,
                '9':1,
                '10':1,
            }, 
            countAllSymbols: function() {return this.allSymbolsCounted},
            symbolRepetitions: {
                // all symbols counterd
            },
            solution: [
                [1, 2, 3],
                [1, 4, 5],
                [2, 4, 6],
                [1, 7, 8],
                [1, 9, 10],
            ],
            addedCard:[6],
            allSymbolsCounted1:{
                '1':2,
                '2':2,
                '3':3,
                '4': 2,
                '5':1,
                '6':1,
            }, 
            countAllSymbols1: function() {return this.allSymbolsCounted},
            symbolRepetitions1: {
                // all symbols counterd
            },
            solution1: [
                [1, 2, 3],
                [1, 4, 5],
                [2, 4, 6]
            ],
            addedCard1:[1]
        },
        description: 'Expect to clear _restrictedSymbols each time function is called,',
        expected: [1, 2, 3, 4, 5],
        input: null,
        testedFunction: (mockData, beforeEachData) => {
            const mocked = new Mocker();
            const mocked1 = new Mocker();
            mocked.mockParam('allSymbolsCounted', mockData.allSymbolsCounted);
            mocked.mockParam('symbolRepetitions', mockData.allSymbolsCounted);
            mocked.mockParam('solution', mockData.solution);
            mocked.mockMethod('countAllSymbols', mockData.countAllSymbols)

            mocked1.mockParam('allSymbolsCounted', mockData.allSymbolsCounted1);
            mocked1.mockParam('symbolRepetitions', mockData.allSymbolsCounted1);
            mocked1.mockParam('solution', mockData.solution1);
            mocked1.mockMethod('countAllSymbols', mockData.countAllSymbols1)
            beforeEachData.testedInstance.alignWithSolutionAndAddedCard(mocked, mockData.addedCard)
            beforeEachData.testedInstance.alignWithSolutionAndAddedCard(mocked1, mockData.addedCard1)
            return () =>  Object.keys(beforeEachData.testedInstance._restrictedSymbols).map(s => parseInt(s));
        },
        matcher: arraysHaveSamePrimitiveElements
    },
    {
        mockData: {
            allSymbolsCounted:{
                '1':4,
                '2':2,
                '3':3,
                '4': 2,
                '5':1,
                '6':1,
                '7':1,
                '8':1,
                '9':1,
                '10':1,
            }, 
            countAllSymbols: function() {return this.allSymbolsCounted},
            symbolRepetitions: {
                // all symbols counterd
            },
            solution: [
                [1, 2, 3],
                [1, 4, 5],
                [2, 4, 6],
                [1, 7, 8],
                [1, 9, 10],
            ],
            addedCard:[6]
        },
        description: 'Expect to exclude a symbol just because it repetes too many times,',
        expected: [1, 2, 4, 6],
        input: null,
        testedFunction: (mockData, beforeEachData) => {
            const mocked = new Mocker();
            mocked.mockParam('allSymbolsCounted', mockData.allSymbolsCounted);
            mocked.mockParam('symbolRepetitions', mockData.allSymbolsCounted);
            mocked.mockParam('solution', mockData.solution);
            mocked.mockMethod('countAllSymbols', mockData.countAllSymbols)
            beforeEachData.testedInstance.alignWithSolutionAndAddedCard(mocked, mockData.addedCard)
            return () =>  Object.keys(beforeEachData.testedInstance._restrictedSymbols).map(s => parseInt(s));
        },
        matcher: arraysHaveSamePrimitiveElements
    },
];

export {
    alignWithSolutionAndAddedCard_TC,

}