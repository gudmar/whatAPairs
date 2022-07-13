import ArrayElementsCounter from './arrayElementsCounter.js';
import { isSolutionValid, allCardsHaveEqualLength } from './solutionValidator.js'

class CardsGenerator {
    constructor(desiredNumberOfSymbolsOnACard) {
        if (desiredNumberOfSymbolsOnACard < 2) throw new Error('CardsGenerator: desired number of symbols on a card should be > 1.')
        this.desiredNumberOfSymbolsOnACard = desiredNumberOfSymbolsOnACard;
        this.baseSolution = [
            [1,  3],
            [1,  2],
            [2,  3],
        ];
        this._connectedCards = {}; // from 0
        this._restrictedSymbols = {};
        this._alreadyUsedSymbols = {};
        this.cardStartingSymbolIndex = 1;
        // nextSymbolToUse = 1;
        this.solution = this.baseSolution;
        this.addedCard = [];
        this.symbols = this.getSymbolsArray(desiredNumberOfSymbolsOnACard); // from 0
        this.symbolIndex = 0;
    }
    setProp(value, prop) {
        this[prop] = value;
    }

    get nrOfCards() { return this.solution.length; }

    get connectedCards() {
        return Object.keys(this._connectedCards).map(index => parseInt(index));
    }

    get alreadyUsedSymbols() { return Object.keys(this._alreadyUsedSymbols).map(s => parseInt(s))}

    addToAlreadyUsedSymbols(symbol) {this.alreadyUsedSymbols.push(symbol)}

    setConnectedCard(cardIndex) {
        if (this.connectedCards[`${cardIndex}`]) return false;
        this.connectedCards[`${cardIndex}`] = true
        return true;
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

    countDesiredtNrOfCards(symbolsOnACard = this.desiredNumberOfSymbolsOnACard) {
        return this.countNrOfSymbols(symbolsOnACard);
    }

    getSymbolsArray(nrOfSymbols) { return Array(nrOfSymbols).fill().map((_, index) => index); }

    getFirstNotRestrictedSymbol(){
        return this.symbols.find((item, index) => { console.log(item); return item !== this.restrictedSymbols[index]})
    }

    fillRestrictedSymbolsFromSingleCard(symbol, card) {
        console.log(card, typeof card)
        if (card.find(s => s === symbol) === undefined) return;
        card.forEach(s => this.addRestrictedSymbol(s));
    }

    fillRestrictedSymbolFromAllCards(symbol, solution) {
        solution.forEach(card => this.fillRestrictedSymbolsFromSingleCard(symbol, card))
    }

    fillRestrictedSymbols(card, solution) {
        card.forEach(symbol => this.fillRestrictedSymbolFromAllCards(symbol, solution))
    }

    fillConnectedCardsWithSingleSymbol(symbol) {
        const cardsAddedWithThisIteration = [];
        this.solution.forEach((card, index) => {
            if (card.find(s => (symbol === s))){
                const isNewConnection = this.setConnectedCard(index);
                if (isNewConnection) cardsAddedWithThisIteration.push(index)
            }
        })
        return cardsAddedWithThisIteration;
    }

    fillConnectedCards() {
        let newlyAddedConnections = [];
        this.addedCard.forEach( symbol => {
            newlyAddedConnections = [
                ...newlyAddedConnections,
                ...this.fillConnectedCardsWithSingleSymbol(symbol)
            ]
        })
        return newlyAddedConnections;
    }

    getFirstNotConnectedCardIndex() {
        for (let i = 0; i < this.nrOfCards; i++){
            if (this._connectedCards[`${i}`] === undefined) return i;
        }
        return -1; // every card connected
    }

    hasAnyCardTooMuchSymbols() {
        return this.solution.findIndex(card => card.length > this.desiredNumberOfSymbolsOnACard) === -1
    }

    doesAnySymbolRepeatTooManyTimes() {
        const allSymbols = this.solution.flat();
        const elementCounter = new ArrayElementsCounter(allSymbols);
        const symbolsRepetitions = elementCounter.values();
        return symbolsRepetitions.some(quantity => quantity > this.desiredNumberOfSymbolsOnACard)
    }

    isPartialSolution(){
        if (!allCardsHaveEqualLength(this.solution)) return false;
        return isSolutionValid(this.solution)
    }

    isFinalSolution() {
        if (!allCardsHaveEqualLength(this.solution)) return false;
        if (this.solution?.[0]?.length !== this.desiredNumberOfSymbolsOnACard) return false;
        return this.isSolutionValid(this.solution)
    }

    logTrace(message) {
        console.log(message,
        'Solution: ',
        this.solution, 
        'nextSymbolToUse',
        this.nextSymbolToUse, 
        'Restricted symbols:',
        this.restrictedSymbols,
        'Connected cards:', 
        this.connectedCards,
        'Added card',
        this.addedCard)
    }


    * getSolution() {
        let nextSymbolToUse;
        do {
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
            this.addedCard.push(nextSymbolToUse); // 90
            const newlyAddedConnections = this.fillConnectedCards();
            this.fillRestrictedSymbols(); // 110
            if (newlyAddedConnections.length === 0) {
                const firstNotConnectedCard = this.getFirstNotConnectedCardIndex();
                if (firstNotConnectedCard === -1) {
                    this.logTrace('Something went not as expected in solution generator. Symbol was added, but no new card was connected:');
                    debugger;
                    throw new Error('Alg failed')
                }
                
                this.solution[firstNotConnectedCard].push(this.nextSymbolToUse);
            } // 100
            this.fillConnectedCards(); // 110
            this.fillRestrictedSymbols(); // 110;
            if (this.hasAnyCardTooMuchSymbols()) {
                this.logTrace('A card has more than desired number of smbols, so alg did not work for this instance');
                debugger;
                throw new Error('Alg failed')
            } // 120
            if (this.doesAnySymbolRepeatTooManyTimes()) {
                this.logTrace('A symbol repetes too many times');
                const elementCounter = ArrayElementsCounter(this.solution.flat());
                console.log('Counted symbols:', elementCounter.getAll());
                debugger;
                throw new Error('Alg failed')
            } // 130

            if (this.isPartialSolution()){
                yield this.solution;
            }
            if (this.isFinalSolution()){
                return this.solution;
            }
        } while (true); // Should be braken by return or error throw
    }

}

export default CardsGenerator;