class CardsGenerator {
    constructor(desiredNumberOfSymbolsOnACard) {
        if (desiredNumberOfSymbolsOnACard < 2) throw new Error('CardsGenerator: desired number of symbols on a card should be > 1.')
        this.desiredNumberOfSymbolsOnACard = desiredNumberOfSymbolsOnACard;
        this.baseSolution = [
            [1,  3]
            [1,  2]
            [2,  3]
        ];
        this.connectedCards = [];
        this._restrictedSymbols = {};
        this.alreadyUsedSymbols = [];
        this.cardStartingSymbolIndex = 1;
        nextSymbolToUse = 1;
        this.solution = this.baseSolution;
        this.addedCard = [];
        this.symbols = this.getSymbolsArray(desiredNumberOfSymbolsOnACard);
    }

    get restrictedSymbols() { return Object.keys(this._restrictedSymbols).map(symbol => parseInt(symbol)); }

    addRestrictedSymbol(symbol) { this._restrictedSymbols[`${symbol}`] = true; }

    emptyRestrictedSymbols() { this._restrictedSymbols = {}; }

    get startingSymbol() { return this.symbols(this.cardStartingSymbolIndex) }

    addAddedCardsToSolution() {
        this.solution.push(this.addedCard);
        this.addedCard = [];
    }

    addStartingSymbolToAddedCard() {
        this.addedCard.push(this.cardStartingSymbol);
        this.cardStartingSymbolIndex++;
    }
    
    countDesiredNrOfSymbols(symbolsOnACard = this.desiredNumberOfSymbolsOnACard){
        return symbolsOnACard * (symbolsOnACard - 1) + 1
    }

    counDesiredtNrOfCards(symbolsOnACard = this.desiredNumberOfSymbolsOnACard) {
        return this.countNrOfSymbols(symbolsOnACard);
    }
    getSymbolsArray(nrOfSymbols) { return Array(nrOfSymbols).fill().map((_, index) => index); }

    getFirstNotRestrictedSymbol(){
        this.restrictedSymbols.find((item, index) => item !== this.symbols[index])
    }

    addRestrictedSymbolsFromSingleCard(symbol, card) {
        if (card.find(s => s === symbol) === undefined) return;
        card.forEach(s => this.addRestrictedSymbol(s));
    }

    addRestrictedSymbolFromAllCards(symbol, solution) {
        solution.forEach(card => this.addRestrictedSymbolsFromSingleCard(symbol, card))
    }

    addRestrictedSymbols(card, solution) {
        card.forEach(symbol => this.addRestrictedSymbolFromAllCards(symbol, card))
    }

}