
export const logicTestCases = [
    {
        data: 1,
        description: 'Test data case pass',
        expected: 1,
    },
    {
        data: 1,
        description: 'Test data case fail',
        expected: 2,
    },
];

export const pairsTestCases = [
    {
        data: {
            nrOfCards: 31,
            nrOfSymbolsOnACard: 6,
        },
        description: 'Sollution should be an array of arrays',
        result: true
    },
    {
        data: {
            nrOfCards: 31,
            nrOfSymbolsOnACard: 6,
        },
        description: 'Each card should have 6 different symbols on it',
        result: true
    },
    {
        data: {
            nrOfCards: 31,
            nrOfSymbolsOnACard: 6,
        },
        description: 'There should be 31 different symbols alltogeher',
        result: 31
    },
    {
        data: {
            nrOfCards: 31,
            nrOfSymbolsOnACard: 6,
        },
        description: 'There should be one and only one repeting sybol between a card and rest of cards',
        result: true,
    },

]

function isSolutionArrayOfArrays(solution){
    if (!Array.isArray(solution)) return false;
    for (let card of solution) {
        if (!Array.isArray(card)) return false;
    }
    return true;
}

function thereShouldBe31Cards(solution) {
    if (!Array.isArray(solution)) return false;
    return solution.length === 31;
}

function eachCardShouldHave6Symbols(solution) {
    if (!Array.isArray(solution)) return false;
    for (let card of solution) {
        if (card.length != 6) {
            console.error(`Card length is != 6`, card);
            return false;
        }
    }
    return true;
}

function getNrOfDifferentSymbols(array){
    const symbols = {};
    array.forEach((item) => {
        if (symbols.find(symbol => item === symbol)){
            symbols[item] += 1;
        } else {
            symbols[item] = 0;
        }
        }
    )
    return Object.keys(symbols).length;
}

function nrOfComonSymbolsFor2cards(card1, card2){
    const concatenatedCards = [...card1, ...card2];
    return concatenatedCards.length - getNrOfDifferentSymbols(concatenatedCards)
}

function symbolRepetsOnlyOnce(solution, cardIndex) {
    // Only one symbol repets on card with cardIndex and all other cards in deck
    const expectedNrOfSymbols = cardIndex.length;
    solution.forEach((card, index) => {
        if (card.length != expectedNrOfSymbols) {
            console.error('There are different card sizes: ', solution, cardIndex);
            return false;
        }
        if (index != cardIndex) {
            if (nrOfComonSymbolsFor2cards(card, solution[cardIndex]) != 2 * expectedNrOfSymbols - 1) {
                console.error(`More than just one symbol repetes: ${index}, ${cardIndex}`);
                return false;                
            }
        }
    })
    return true;
}

function symbolsBetweenEachCardRepeteOnce(solution) {
    solution.forEach((cardNr, index) => {
        if (!symbolRepetsOnlyOnce(solution, index)) {
            return false;
        }
    })
    return true;
}

export default logicTestCases;