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
} = generatePairCards;


const testFunction_countCardsContainingSymbol = (cards) => {
    const testedObject = generatePairCards(3, 12, 4)
    testedObject. _test_injectCardsAlreadyCreated(cards);
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

export {
    countCardsContainingSymbol_TC
}