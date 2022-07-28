class RestrictedSymbolsManager {
    constructor(nrOfSymbolsOnACard){
        this._restrictedSymbols = {}
        this.nrOfSymbolsOnACard = nrOfSymbolsOnACard;
        this.symbols = Array(this.calculateNumberOfDifferentSymbols()).fill().map((_, index) => index);
    }
    get getAll(){
        return Object.keys(this._restrictedSymbols)
    }
    set restrictedSymbol(symbol) {
        this._restrictedSymbols[symbol] = true;
    }

    contains(symbol) {
        return this._restrictedSymbols[symbol] !== undefined;
    }

    calculateNumberOfDifferentSymbols(symbolsOnACard = this.nrOfSymbolsOnACard){
        return symbolsOnACard * (symbolsOnACard - 1) + 1
    }


    alignWithSolutionAndAddedCard(solutionManagerInstance, addedCard){
        const fillRestrictedSymbolsFromSingleCard = (symbol, card) => {
            if (card.find(s => s === symbol) === undefined) return;
            card.forEach(s => this.restrictedSymbol = s);
        }
        const fillRestrictedSymbolFromAllCards = (symbol, solution) => {
            solution.forEach(card => fillRestrictedSymbolsFromSingleCard(symbol, card))
        }
        const fillRestrictedSymbols = (card, solution) => {
            card.forEach(symbol => fillRestrictedSymbolFromAllCards(symbol, solution))
        }
        this._restrictedSymbols = {};
        solutionManagerInstance.countAllSymbols();
        const nrOfRepetitions = solutionManagerInstance.symbolRepetitions;
        Object.keys(nrOfRepetitions).forEach(symbol => {
            if(nrOfRepetitions[symbol] === this.nrOfSymbolsOnACard) this.restrictedSymbol = symbol;
            if (nrOfRepetitions[symbol] > this.nrOfSymbolsOnACard) console.error('symbolsManager: solution has more than desriedNrOfSymbols symbols!')
        });
        const solution = solutionManagerInstance.solution;
        fillRestrictedSymbols(addedCard, solution)
    }
    findFirstNotRestrictedSymbol() {
        const finalSolution = this.symbols.reduce((prev, symbol, index) => {
            if (!this._restrictedSymbols.includes(symbol) && prev === -1) prev = index;
            return prev;
        }, -1)
        return finalSolution;
    }
}

export default RestrictedSymbolsManager;
