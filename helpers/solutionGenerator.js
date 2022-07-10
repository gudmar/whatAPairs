class CardsGenerator {
    constructor(desiredNumberOfSymbolsOnACard) {
        if (desiredNumberOfSymbolsOnACard < 2) throw new Error('CardsGenerator: desired number of symbols on a card should be > 1.')
        this.desiredNumberOfSymbolsOnACard = desiredNumberOfSymbolsOnACard;
        this.baseSolution = [
            [1,  3]
            [1,  2]
            [2,  3]
        ];
        this._connectedCards = {};
        this._restrictedSymbols = {};
        this._alreadyUsedSymbols = {};
        this.cardStartingSymbolIndex = 1;
        nextSymbolToUse = 1;
        this.solution = this.baseSolution;
        this.addedCard = [];
        this.symbols = this.getSymbolsArray(desiredNumberOfSymbolsOnACard);
        this.symbolIndex = 0;
    }

    get connectedCards() {
        return Object.keys(this._connectedCards).map(index => parseInt(index));
    }

    get alreadyUsedSymbols() { return Object.keys(this._alreadyUsedSymbols).map(s => parseInt(s))}
    addToAlreadyUsedSymbols(symbol) {this.alreadyUsedSymbols.push(symbol)}

    setConnectedCard(cardIndex) {
        this.connectedCards[`${cardIndex}`] = true
    }

    get symbol() {this.symbols[this.symbolIndex]};

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

    fillRestrictedSymbolsFromSingleCard(symbol, card) {
        if (card.find(s => s === symbol) === undefined) return;
        card.forEach(s => this.addRestrictedSymbol(s));
    }

    fillRestrictedSymbolFromAllCards(symbol, solution) {
        solution.forEach(card => this.fillRestrictedSymbolsFromSingleCard(symbol, card))
    }

    fillRestrictedSymbols(card, solution) {
        card.forEach(symbol => this.fillRestrictedSymbolFromAllCards(symbol, card))
    }

    fillConnectedCardsWithSingleSymbol(symbol) {
        this.solution.forEach((card, index) => {
            if (card.find(s => (symbol === s) !== undefined )){
                this.setConnectedCard(index)
            }
        })
    }

    fillConnectedCards() {
        this.addedCard.forEach( symbol => {
            this.fillConnectedCardsWithSingleSymbol(symbol)
        })
    }


    getSolution() {
        let nextSymbolToUse;
        this.addedCard.push(this.cardStartingSymbol) // 20
        this.fillConnectedCards(); // 40
        this.fillRestrictedSymbols(); // 50;
        this.alreadyUsedSymbols.push(this.symbol);//60
        const firstNotRestrictedSymbol = this.getFirstNotRestrictedSymbol(); // 70
        nextSymbolToUse = firstNotRestrictedSymbol;
        this.addToAlreadyUsedSymbols(nextSymbolToUse); // 70
        if (nextSymbolToUse === undefined) {
            this.symbolIndex += 1;
            nextSymbolToUse = this.symbol;   
        }                               // 80
        this.addedCard.push(nextSymbolToUse);
        this.fillConnectedCards();
        this.fillRestrictedSymbols(); // 90
        


    }

}