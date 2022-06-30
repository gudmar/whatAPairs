import generatePairCards from '../helpers/pairGenerator.js';
import { arraysHaveSamePrimitiveElements } from '../libs/testMatchers.js';

// countCardsContainingSymbol(symbol)
const {
    countCardsContainingSymbol: countCardsContainingSymbol,
    takeASymbolForCardCreation: takeASymbolForCardCreation,
    takeASymbolForFilling: takeASymbolForFilling,
    createUpToDesiredNrOfBlankCards: createUpToDesiredNrOfBlankCards,
    // checkIfCardHasTwoSymbols: checkIfCardHasTwoSymbols,
    checkIfCardsHaveSymbolAAndOtherRepetingSymbol: checkIfCardsHaveSymbolAAndOtherRepetingSymbol,
    checkIfAnyCardHasSymbolAAndAnyOtherSymbol: checkIfAnyCardHasSymbolAAndAnyOtherSymbol,
    fillCardWithSymbol: fillCardWithSymbol,
    fillCardWithAllSymbols: fillCardWithAllSymbols,
    fillCardsThatAreCreatedWithSymbols: fillCardsThatAreCreatedWithSymbols,
    moveCardsFromCreationToReady: moveCardsFromCreationToReady,
    createNewCards,
    getCards,
    _test_injectCards,
    _test_injectCardsCreated,
    _test_injectSymbols,
    _test_injectCardsAlreadyCreated,
    _test_getCardsCreatedAtTheMoment,
    _test_injectSymbolsAlreadyUsed,
} = generatePairCards;


const testFunction_countCardsContainingSymbol = (cards) => {
    const testedObject = new generatePairCards({
        nrOfCards: 3,
        nrOfSymbolsOnACard: 12,
        nrOfSymbols: 4
    });
    testedObject._test_injectCardsAlreadyCreated(cards);
    return testedObject.countCardsContainingSymbol;
};
const countCardsContainingSymbol_TC = [
    {
        mockData: [
            [1, 2, 3, 4], [5, 6, 7, 8], [1, 9, 10, 11, 12], [1, 2, 3]
        ],
        input: 1,
        description: 'Should find 3 cards containing a symbol 1',
        expected: 3,
        testedFunction: testFunction_countCardsContainingSymbol
    },
    {
        mockData: [
            [1, 2, 3, 4], [5, 6, 7, 8], [1, 9, 10, 11, 12], [1, 2, 3]
        ],
        input: 12,
        description: 'Should find 1 card containing a symbol 12',
        expected: 1,
        testedFunction: testFunction_countCardsContainingSymbol
    },
    {
        mockData: [
            [1, 2, 3, 4], [5, 6, 7, 8], [1, 9, 10, 11, 12], [1, 2, 3]
        ],
        input: 13,
        description: 'Should find 0 cards containing a symbol 13',
        expected: 0,
        testedFunction: testFunction_countCardsContainingSymbol
    },
]


const testedFunction_createUpToDesiredNrOfBlankCards = ({cardsAlreadyCreated, symbols}) => {
    const testedObject = new generatePairCards({
        nrOfCards: 4,
        nrOfSymbolsOnACard: 4,
        nrOfSymbols: 9
    });
    testedObject._test_injectSymbols(symbols);
    testedObject._test_injectCardsAlreadyCreated(cardsAlreadyCreated);
    return ({numberOfCards, firstSymbol}) => {
        const result = testedObject.createUpToDesiredNrOfBlankCards(numberOfCards, firstSymbol);
        return testedObject._test_getCardsCreatedAtTheMoment().length;
    }
};
const createUpToDesiredNrOfBlankCards_TC = [
    {
        mockData: {
            cardsAlreadyCreated: [
                [1, 2, 3, 4], [2, 3, 4, 5], [6, 7, 8, 9]
            ],
            symbols: [1,2,3,4,5,6,7,8,9],
        },
        input: {numberOfCards: 4, firstSymbol: 2},
        expected: 2,
        description: 'Should create 2 cards with symbol 2',
        testedFunction: testedFunction_createUpToDesiredNrOfBlankCards,
    },
    {
        mockData: {
            cardsAlreadyCreated: [
                [1, 2, 3, 4], [2, 3, 4, 5], [6, 7, 8, 9]
            ],
            symbols: [1,2,3,4,5,6,7,8,9],
        },
        input: {numberOfCards: 4, firstSymbol: 0},
        expected: 4,
        description: 'Should create 4 cards with symbol 0',
        testedFunction: testedFunction_createUpToDesiredNrOfBlankCards,
    },
]


const cardForTestingIfTheSameCardInstanceIsChosen = [2, 31, 32, 33, 34, 35]
const checkIfAnyCardHasSymbolAAndAnyOtherSymbo_TC = [
    {
        mockData: {},
        beforeEachData: {
            cardsAlreadyCreated: [
                [1, 2, 3, 4, 5, 6],
                [1, 7, 8, 9, 10, 11],
                [2, 12, 13, 14, 15, 16],
            ],
            cardsCreatedAtTheMoment: [
                [2, 4, 12, 17, 18],
                [2, 3, 8, 19, 20],
                cardForTestingIfTheSameCardInstanceIsChosen,
            ]
        },
        input: {symbolA: 2, cardToTakeSymbolsFrom: [2, 21, 22, 23]},
        description: 'Should return false in case given card does not have >=2 common symbols with other cards',
        expected: false,
        beforeEach: ({cardsAlreadyCreated, cardsCreatedAtTheMoment}) => {
            const testedObject = new generatePairCards({
                nrOfCards: 10,
                nrOfSymbolsOnACard: 6,
                nrOfSymbols: 25
            });
            testedObject._test_injectCardsAlreadyCreated(cardsAlreadyCreated);
            testedObject._test_injectCardsCreated(cardsCreatedAtTheMoment);
            return {testedInstance: testedObject};
        },
        testedFunction: (notAplicable, beforeEachData) => {
            return beforeEachData.testedInstance.checkIfAnyCardHasSymbolAAndAnyOtherSymbol;
        }
    },
    {
        input: {symbolA: 2, cardToTakeSymbolsFrom: [2, 21, 22, 19]},
        description: 'Should return true in case 2 symbols repete on a given card and another card in cardsCreatedAtTheMoment',
        expected: true,
        testedFunction: (notAplicable, beforeEachData) => {
            return beforeEachData.testedInstance.checkIfAnyCardHasSymbolAAndAnyOtherSymbol;
        }
    },
    {
        input: {symbolA: 2, cardToTakeSymbolsFrom: [2, 21, 12, 23]},
        description: 'Should return true in case 2 symbols repete on a given card and another card in cardsAlreadyCreated',
        expected: true,
        testedFunction: (notAplicable, beforeEachData) => {
            return beforeEachData.testedInstance.checkIfAnyCardHasSymbolAAndAnyOtherSymbol;
        }
    },
    {
        input: {symbolA: 2, cardToTakeSymbolsFrom: cardForTestingIfTheSameCardInstanceIsChosen},
        description: 'Should return fase in case all symbols repete, but the same card that is given appears, and no other card has 2 or more repeting symbols',
        expected: false,
        testedFunction: (notAplicable, beforeEachData) => {
            return beforeEachData.testedInstance.checkIfAnyCardHasSymbolAAndAnyOtherSymbol;
        }
    }
]

const fillCardWithSymbol_TC = [
    {
        mockData: {
            symbolsAlreadyUsed: [1, 2],
        },
        beforeEachData: {
            cardsAlreadyCreated: [
                [1, 2, 3, 4, 5, 6],
                [1, 7, 8, 9, 10, 11],
                [2, 12, 13, 14, 15, 16]
            ],
            cardsCreatedAtTheMoment: [
                [2, 4, 12, 17, 18],
                [2, 3, 8, 19, 20]
            ],
            symbols: Array(25).fill().map((_, index) => index)
        },
        input: [2],
        description: 'Should return false in case given card does not have >=2 common symbols with other cards',
        expected: false,
        beforeEach: ({cardsAlreadyCreated, cardsCreatedAtTheMoment, symbols}) => {
            const testedObject = new generatePairCards({
                nrOfCards: 10,
                nrOfSymbolsOnACard: 6,
                nrOfSymbols: 25
            });
            testedObject._test_injectCardsAlreadyCreated(cardsAlreadyCreated);
            testedObject._test_injectCardsCreated(cardsCreatedAtTheMoment);
            testedObject._test_injectSymbols(symbols)
            return {testedInstance: testedObject};
        },
        testedFunction: (mockData, beforeEachData) => {
            const injectSymbolsFunction = beforeEachData.testedInstance._test_injectSymbolsAlreadyUsed;
            console.log(beforeEachData.testedInstance)
            injectSymbolsFunction(mockData.symbolsAlreadyUsed);
            return beforeEachData.testedInstance.fillCardWithSymbol;
        },
        matcher: arraysHaveSamePrimitiveElements
    }
]

export {
    countCardsContainingSymbol_TC,
    createUpToDesiredNrOfBlankCards_TC,
    checkIfAnyCardHasSymbolAAndAnyOtherSymbo_TC,
    fillCardWithSymbol_TC
}