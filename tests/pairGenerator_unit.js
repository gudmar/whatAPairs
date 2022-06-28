import generatePairCards from '../helpers/pairGenerator.js'

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

export {
    countCardsContainingSymbol_TC,
    createUpToDesiredNrOfBlankCards_TC,
}