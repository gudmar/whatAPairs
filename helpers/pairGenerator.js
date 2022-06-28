export default function generatePairCards(nrOfCards, nrOfSymbolsOnACard, nrOfSymbols) {
    let symbols = Array(nrOfSymbols).fill().map((_, index) => index);
    let symbolsAlreadyUsed = [];
    let cardsAlreadyCreated = [];
    let cardsCreatedAtTheMoment = [];
    let   indexOfLastSymbolCardWasCreated = -1;
    let   indexOfLastSymbolUsedToFill = -1;

    // Take a symbol, and create nrOfSymbolsOnACard cards containing it and not used symbols as the rest
    // Take a next symbol, and check how many cards contain it, then create a card for every missing card 
    // If run out of symbols: alarm

    function _test_injectCards(cards) {cardsAlreadyCreated = cards};
    function _test_injectCardsCreated(cards) {cardsCreatedAtTheMoment = cards};
    function _test_injectCardsAlreadyCreated(cards) {cardsAlreadyCreated = cards};
    function _test_injectSymbols(symbolsForTests) {symbols = symbolsForTests};


    function countCardsContainingSymbol(symbol) {
        return cardsAlreadyCreated.reduce((acc, card, index) => {
            if (!Array.isArray(card)) return acc;
            if (card.find(s => symbol === s)) acc +=1;
            return acc;
        }, 0)
    }

    function takeASymbolForCardCreation() {
        if (symbols.length - 1 === indexOfLastSymbolCardWasCreated) throw new Error('Symbols already used, this instance will not work')
        indexOfLastSymbolCardWasCreated++;
        return symbols[indexOfLastSymbolCardWasCreated];
    }

    function takeASymbolForFilling() {
        if (symbols.length - 1 === indexOfLastSymbolUsedToFill) throw new Error('Symbols for filling already used, this instance will not work')
        indexOfLastSymbolUsedToFill++;
        return symbols[indexOfLastSymbolUsedToFill];
    }

    function createUpToDesiredNrOfBlankCards(number, firstSymbol) {
        const nrOfCardsToCreate = nrOfCards - countCardsContainingSymbol(firstSymbol);
        for (let c = nrOfCardsToCreate; c > 0; c--) {
            cardsCreatedAtTheMoment.push(firstSymbol);
        }
    }

    function checkIfCardHasTwoSymbols(symbolA, symbolB, card){
        const hasSymbolA = card.find(symbol => symbolA === symbol);
        if (!hasSymbolA) return false;
        const hasSymbolB = card.find(symbol => symbolB === symbol);
        return hasSymbolB;
    }

    function checkIfCardsHaveSymbolAAndOtherRepetingSymbol(cardToCheckIn, cardToTakeSymbolsFrom, symbolA) {
        if (!cardToCheckIn.find(symbol => symbol === symbolA)) return false;
        for(let symbol of cardToTakeSymbolsFrom) {
            if (symbol !== symbolA) {
                if (checkIfCardHasTwoSymbols(symbolA, symbol, cardToCheckIn)) return true;
            }
        }
        return false;
    }

    function checkIfAnyCardHasSymbolAAndAnyOtherSymbol(symbolA, cardToTakeSymbolsFrom){
        for(let card of cardsAlreadyCreated){
            if (cardToTakeSymbolsFrom !== card){
                if (checkIfCardsHaveSymbolAAndOtherRepetingSymbol(card, cardToTakeSymbolsFrom, symbolA)) return true;
            }
        }
        for(let card of cardsCreatedAtTheMoment){
            if (cardToTakeSymbolsFrom !== card){
                if (checkIfCardsHaveSymbolAAndOtherRepetingSymbol(card, cardToTakeSymbolsFrom, symbolA)) return true;
            }
        }
        return false;
    }

    function fillCardWithSymbol(card){
        if (card.length === nrOfSymbolsOnACard) return;
        let symbolSuccessfullyChosen = false;
        do {
            const newSymbol = takeASymbolForFilling();
            card.push(newSymbol);
            symbolSuccessfullyChosen = checkIfAnyCardHasSymbolAAndAnyOtherSymbol(newSymbol, card);
            if(!symbolSuccessfullyChosen) card.pop();
        } while (symbolSuccessfullyChosen);
    }

    function fillCardWithAllSymbols(card) {
        for(let i = nrOfSymbolsOnACard - card.length; i > 0; i--){
            fillCardWithSymbol(card);
        }
    }

    function fillCardsThatAreCreatedWithSymbols() {
        for(let card of cardsCreatedAtTheMoment){
            fillCardWithAllSymbols(card);
        }
    }

    function moveCardsFromCreationToReady() {
        if (cardsCreatedAtTheMoment.length > 0) {
            do {
                const cardToBeMoved = cardsCreatedAtTheMoment.pop();
                cardsAlreadyCreated.push(cardToBeMoved);
            } while (cardsCreatedAtTheMoment.length > 0)
        }
    }

    function createNewCards() {
        for (let symbol of symbols){
            const newSymbol = takeASymbolForCardCreation();
            createUpToDesiredNrOfBlankCards(nrOfCards, symbol);
            fillCardsThatAreCreatedWithSymbols();
            moveCardsFromCreationToReady();
        }        
    }

    function getCards() {
        createNewCards();
        return cardsAlreadyCreated;
    }

    return {
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
        _test_injectCards,
        _test_injectCardsCreated,
        _test_injectSymbols,
        _test_injectCardsAlreadyCreated,
        getCards,
    }
}