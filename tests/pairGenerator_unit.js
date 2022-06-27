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
} = generatePairCards;

const countCardsContainingSymbol_TC = [
    {
        data: [
            [1, 2, 3, 4], [5, 6, 7, 8], [1, 9, 10, 11, 12], [1, 2, 3]
        ],
        description: 'Should find 3 cards containing a symbol 1',
        expected: 3,
        testedFunction: (cards) => {
            const testedObject = generatePairCards(3, 12, 4)
            testedObject._test_injectCards(cards);
            return testedObject.countCardsContainingSymbol;
        }
    }

]

export {
    countCardsContainingSymbol_TC
}