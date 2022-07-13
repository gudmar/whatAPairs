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

const fillRestrictedSymbolFromAllCards_TC = [
    {
        beforeEachData: {
            desiredNrOfCards: 5
        },
        beforeEach: ({desiredNrOfCards}) => {
            const testedObject = new CardsGenerator(desiredNrOfCards);
            return { testedInstance: testedObject }
        },
        description: 'Expect to return [1, 2, 3, 4, 5] when new card with symbol 3 is added to solution',
        input: {
            card:[3],
            solution: [
                [ 1,   3,   5],
                [ 1,   2],   
                [ 3,   2,   4],
                [ 1,   4,   6],
                [ 2,   5,   6],
            ]
        },
        mockData: {
            restrictedSymbols: []
        },
        expected: [1, 2, 3, 4, 5],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ restrictedSymbols }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return ({ card, solution }) => {
                testedInstance.fillRestrictedSymbolFromAllCards.call(testedInstance, card[card.length - 1], solution);
                return testedInstance.restrictedSymbols;
            }
        },
    },
    {
        description: 'Expect to return [1, 2, 3, 4, 5] when new card with symbol 3 is added to solution, and restricted symbols array already has [1, 2, 3] symbols',
        input: {
            card:[3],
            solution: [
                [ 1,   3,   5],
                [ 1,   2],   
                [ 3,   2,   4],
                [ 1,   4,   6],
                [ 2,   5,   6],
            ]
        },
        mockData: {
            restrictedSymbols: {1:true,2:true,3:true}
        },
        expected: [1, 2, 3, 4, 5],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ restrictedSymbols }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return ({ card, solution }) => {
                testedInstance.fillRestrictedSymbolFromAllCards.call(testedInstance, card[card.length - 1], solution);
                return testedInstance.restrictedSymbols;
            }
        },
    },
        {
            description: 'Expect to return [1, 2, 3, 4, 6] when new card with symbol 3 is added to solution, and restricted symbols array already has [2, 4] symbols. Will not fill 5, as it only searches for a single symbol in all cards',
            input: {
                card:[3, 4],
                solution: [
                    [ 1,   3,   5],
                    [ 1,   2],   
                    [ 3,   2,   4],
                    [ 1,   4,   6],
                    [ 2,   5,   6],
                ]
            },
            mockData: {
                restrictedSymbols: {2:true,4:true}
            },
            expected: [1, 2, 3, 4, 6],
            matcher: arraysHaveSamePrimitiveElements,
    
            testedFunction: ({ restrictedSymbols }, { testedInstance }) => {
                testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
                return ({ card, solution }) => {
                    testedInstance.fillRestrictedSymbolFromAllCards.call(testedInstance, card[card.length - 1], solution);
                    return testedInstance.restrictedSymbols;
                }
            },
        },
]

const fillRestrictedSymbols_TC = [
    {
        beforeEachData: {
            desiredNrOfCards: 5
        },
        beforeEach: ({desiredNrOfCards}) => {
            const testedObject = new CardsGenerator(desiredNrOfCards);
            return { testedInstance: testedObject }
        },
        description: 'Expect to return [1, 2, 3, 4, 5, 6] when new card with symbol 3 is added to solution, and restricted symbols array already has [2, 4] symbols.',
        input: {
            card:[3, 4],
            solution: [
                [ 1,   3,   5],
                [ 1,   2],   
                [ 3,   2,   4],
                [ 1,   4,   6],
                [ 2,   5,   6],
            ]
        },
        mockData: {
            restrictedSymbols: {2:true,4:true}
        },
        expected: [1, 2, 3, 4, 5, 6],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ restrictedSymbols }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return ({ card, solution }) => {
                testedInstance.fillRestrictedSymbols.call(testedInstance, card, solution);
                return testedInstance.restrictedSymbols;
            }
        },
    },
    {
        description: 'Expect to return [1, 2, 3, 4, 6] when card with [1] is passed.',
        input: {
            card:[1],
            solution: [
                [ 1,   3,   5],
                [ 1,   2],   
                [ 3,   2,   4],
                [ 1,   4,   6],
                [ 2,   5,   6],
            ]
        },
        mockData: {
            restrictedSymbols: {}
        },
        expected: [1, 2, 3, 4, 5, 6],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ restrictedSymbols }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
            return ({ card, solution }) => {
                testedInstance.fillRestrictedSymbols.call(testedInstance, card, solution);
                return testedInstance.restrictedSymbols;
            }
        },
    },
        {
            description: 'Expect to return [1, 2, 3, 7] when card with [1] is passed.',
            input: {
                card:[1],
                solution: [
                    [ 1,   2],
                    [ 1,   3],   
                    [ 2,   3],
                    [ 2,   4],
                    [ 4,   5,   6],
                    [1, 7]
                ]
            },
            mockData: {
                restrictedSymbols: {}
            },
            expected: [1 ,2, 3, 7],
            matcher: arraysHaveSamePrimitiveElements,
    
            testedFunction: ({ restrictedSymbols }, { testedInstance }) => {
                testedInstance.setProp.call(testedInstance, restrictedSymbols, '_restrictedSymbols');
                return ({ card, solution }) => {
                    testedInstance.fillRestrictedSymbols.call(testedInstance, card, solution);
                    return testedInstance.restrictedSymbols;
                }
            },
        },
]

const fillConnectedCards_TC = [
    {
        beforeEachData: {
            desiredNrOfCards: 5
        },
        beforeEach: ({desiredNrOfCards}) => {
            const testedObject = new CardsGenerator(desiredNrOfCards);
            return { testedInstance: testedObject }
        },
        description: 'Expect to return [0, 2, 3] when new card with symbol 3 is added to solution, and restricted symbols array already has [3, 4] symbols.',
        input: {},
        mockData: {
            connectedCards: {},
            addedCard:[3, 4],
            solution: [
                [ 1,   3,   5],
                [ 1,   2],   
                [ 3,   2,   4],
                [ 1,   4,   6],
                [ 2,   5,   6],
            ]
        },
        expected: [0, 2, 3,],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ connectedCards, addedCard, solution }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            testedInstance.setProp.call(testedInstance, solution, 'solution');
            testedInstance.setProp.call(testedInstance, addedCard, 'addedCard');
            return ({ card, solution }) => {
                testedInstance.fillConnectedCards.call(testedInstance, card, solution);
                return testedInstance.connectedCards;
            }
        },
    },

    {
        description: 'Expected to return [0, 3, 4, 5, 6, 7] when addedCard [2, 23]',
        input: {},
        mockData: {
            connectedCards: {},
            addedCard:[2, 23],
            solution: [
                [1, 2, 3, 4, 5],
                [1, 6, 7, 8, 9],
                [1, 10, 11, 12],
                [1, 2, 13, 14],
                [2, 15, 16],
                [2, 17, 18],
                [2, 3, 19, 20],
                [3, 21, 22, 23]
            ]
        },
        expected: [0, 3, 4, 5, 6, 7],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ connectedCards, addedCard, solution }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            testedInstance.setProp.call(testedInstance, solution, 'solution');
            testedInstance.setProp.call(testedInstance, addedCard, 'addedCard');
            return ({ card, solution }) => {
                testedInstance.fillConnectedCards.call(testedInstance, card, solution);
                return testedInstance.connectedCards;
            }
        },
    },

    {
        description: 'Expected to return []: edge case, empty solution',
        input: {},
        mockData: {
            connectedCards: {},
            addedCard:[2, 23],
            solution: [
            ]
        },
        expected: [],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ connectedCards, addedCard, solution }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            testedInstance.setProp.call(testedInstance, solution, 'solution');
            testedInstance.setProp.call(testedInstance, addedCard, 'addedCard');
            return ({ card, solution }) => {
                testedInstance.fillConnectedCards.call(testedInstance, card, solution);
                return testedInstance.connectedCards;
            }
        },
    },
    {
        description: 'Expected to return []: edge case, empty addedCard',
        input: {},
        mockData: {
            connectedCards: {},
            addedCard:[],
            solution: [
                [1, 2, 3, 4, 5],
                [1, 6, 7, 8, 9],
                [1, 10, 11, 12],
                [1, 2, 13, 14],
                [2, 15, 16],
                [2, 17, 18],
                [2, 3, 19, 20],
                [3, 21, 22, 23]
            ]
        },
        expected: [],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ connectedCards, addedCard, solution }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            testedInstance.setProp.call(testedInstance, solution, 'solution');
            testedInstance.setProp.call(testedInstance, addedCard, 'addedCard');
            return ({ card, solution }) => {
                testedInstance.fillConnectedCards.call(testedInstance, card, solution);
                return testedInstance.connectedCards;
            }
        },
    },
    {
        description: 'Expected to return [0, 3, 4, 5, 6] when addedCard [2, 23], edge case: one card symbol is of type stirng rest are numbers. Empty cards in solution.',
        input: {},
        mockData: {
            connectedCards: {},
            addedCard:[2, 23],
            solution: [
                [1, 2, 3, 4, 5],
                [1, 6, 7, 8, 9],
                [1, 10, 11, 12],
                [1, 2, 13, 14],
                [2, 15, 16],
                [2, 17, 18],
                [2, 3, 19, 20],
                [],
                [3, 21, 22, '23'],
                []
            ]
        },
        expected: [0, 3, 4, 5, 6],
        matcher: arraysHaveSamePrimitiveElements,

        testedFunction: ({ connectedCards, addedCard, solution }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            testedInstance.setProp.call(testedInstance, solution, 'solution');
            testedInstance.setProp.call(testedInstance, addedCard, 'addedCard');
            return ({ card, solution }) => {
                testedInstance.fillConnectedCards.call(testedInstance, card, solution);
                return testedInstance.connectedCards;
            }
        },
    },
]

const getFirstNotConnectedCardIndex_TC = [
    {
        beforeEachData: {
            desiredNrOfCards: 5
        },
        beforeEach: ({desiredNrOfCards}) => {
            const testedObject = new CardsGenerator(desiredNrOfCards);
            return { testedInstance: testedObject }
        },
        description: 'Expect to return 0 when already connected cards are 1, 2 and 4',
        input: {},
        mockData: {
            connectedCards: {1:true,2:true,4:true},
        },
        expected: 0,
        matcher: (a, b) => a === b,
        testedFunction: ({ connectedCards }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            return () => {
                return testedInstance.getFirstNotConnectedCardIndex.call(testedInstance);
            }
        },
    },

    {
        description: 'Expect to return 3 when already connected cards are 0, 1, 2 and 4',
        input: {},
        mockData: {
            connectedCards: {0:true, 1:true,2:true,4:true},
        },
        expected: 3,
        matcher: (a, b) => a === b,
        testedFunction: ({ connectedCards }, { testedInstance }) => {
            testedInstance.setProp.call(testedInstance, connectedCards, '_connectedCards');
            return () => {
                return testedInstance.getFirstNotConnectedCardIndex.call(testedInstance);
            }
        },
    },

    {
        description: 'Expect to find -1 in case all cards are connected. Edge case',
        input: {},
        mockData: {
            connectedCards: ()=> {
                return Array(21).fill().reduce((prev,_,i) => {
                    prev[`${i}`]=true;
                    return prev;
                }, {})
            }
        },
        expected: -1,
        matcher: (a, b) => a === b,
        testedFunction: ({ connectedCards }, { testedInstance }) => {
            console.log(connectedCards())
            testedInstance.setProp.call(testedInstance, connectedCards(), '_connectedCards');
            return () => {
                return testedInstance.getFirstNotConnectedCardIndex.call(testedInstance);
            }
        },
    },

    {
        description: 'Expect to find 20 in case all symbols are filled except for last one.',
        input: {},
        mockData: {
            connectedCards: ()=> {
                return Array(20).fill().reduce((prev,_,i) => {
                    prev[`${i}`]=true;
                    return prev;
                }, {})
            }
        },
        expected: 20,
        matcher: (a, b) => a === b,
        testedFunction: ({ connectedCards }, { testedInstance }) => {
            console.log(connectedCards())
            testedInstance.setProp.call(testedInstance, connectedCards(), '_connectedCards');
            return () => {
                return testedInstance.getFirstNotConnectedCardIndex.call(testedInstance);
            }
        },
    },
]

export {
    getSymbolsArray_TC,
    getFirstNotRestrictedSymbol_TC,
    fillRestrictedSymbolFromAllCards_TC,
    fillRestrictedSymbols_TC,
    fillConnectedCards_TC,
    getFirstNotConnectedCardIndex_TC
}