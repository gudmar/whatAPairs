import Mocker from '../../libs/mockClass.js'
import { arraysHaveSamePrimitiveElements, objectsEqual } from '../../libs/testMatchers.js';
import SolutionManager from '../../helpers/solutionGenerator/solutionManager';

const countAllSymbols_TC = [
    {
        mockData: {
            solution: [
                [1, 2, 3],
                [1, 4, 5],
                [2, 4, 6],
                [3, 5, 6]
            ]
        },
        beforeEachData: {/*constructor data*/},
        description: 'Expect to return proper number of symbols from solution',
        expected: {
            '1': 2,
            '2': 2,
            '3': 2,
            '4': 2,
            '5': 2,
            '6': 2
        },
        input: null,
        beforeEach: () => {return {testedInstance: new SolutionManager()}},
        testedFunction: (mockData, beforeEachData) => {
            beforeEachData.testedInstance._solution = mockData.solution;
            return () =>  beforeEachData.testedInstance.countAllSymbols;
        },
        matcher: objectsEqual
    },

];


export {
    countAllSymbols_TC,
}