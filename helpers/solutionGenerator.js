import ArrayElementsCounter from './arrayElementsCounter.js';
import { isSolutionValid, allCardsHaveEqualLength } from './solutionValidator.js'

class CardsGenerator {
    constructor(desiredNumberOfSymbolsOnACard) {
        console.log(desiredNumberOfSymbolsOnACard);
        if (desiredNumberOfSymbolsOnACard < 2) throw new Error('CardsGenerator: desired number of symbols on a card should be > 1.')
        this.desiredNumberOfSymbolsOnACard = desiredNumberOfSymbolsOnACard;
        this.baseSolution = [
            [0,  2],
            [0,  1],
            [1,  2],
        ];
        this._connectedCards = {}; // from 0
        this._restrictedSymbols = {};
        this._alreadyUsedSymbols = {};
        this.cardStartingSymbolIndex = 0;
        // nextSymbolToUse = 1;
        this.solution = this.baseSolution;
        this.addedCard = [];
        this.symbols = this.getSymbolsArray(this.countDesiredNrOfSymbols(desiredNumberOfSymbolsOnACard)); // from 0
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
        if (this._connectedCards[`${cardIndex}`] === true) return false;
        this._connectedCards[`${cardIndex}`] = true
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
        this.addedCard.push(this.cardStartingSymbolIndex);
        this.cardStartingSymbolIndex++;
    }
    
    countDesiredNrOfSymbols(symbolsOnACard = this.desiredNumberOfSymbolsOnACard){
        return symbolsOnACard * (symbolsOnACard - 1) + 1
    }

    countDesiredtNrOfCards(symbolsOnACard = this.desiredNumberOfSymbolsOnACard) {
        return this.countDesiredNrOfSymbols(symbolsOnACard);
    }

    getSymbolsArray(nrOfSymbols) { return Array(nrOfSymbols).fill().map((_, index) => index); }

    getFirstNotRestrictedSymbol(){
        return this.symbols.find((item, index) => { return item !== this.restrictedSymbols[index]})
    }

    fillRestrictedSymbolsFromSingleCard(symbol, card) {
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
            if (card.find(s => (symbol === s)) !== undefined){
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
        const desiredNumberOfCards = this.countDesiredtNrOfCards();
        for (let i = 0; i < desiredNumberOfCards; i++){
            if (this._connectedCards[`${i}`] === undefined) return i;
        }
        return -1; // every card connected
    }

    hasAnyCardTooMuchSymbols() {
        return this.solution.findIndex(card => card.length > this.desiredNumberOfSymbolsOnACard) !== -1
    }

    doesAnySymbolRepeatTooManyTimes() {
        const allSymbols = [ ...this.solution.flat(), ...this.addedCard ];
        const elementCounter = new ArrayElementsCounter(allSymbols);
        const symbolsRepetitions = elementCounter.values();
        return symbolsRepetitions.some(quantity =>
           quantity > this.desiredNumberOfSymbolsOnACard
        )
    }

    isPartialSolution(){
        if (!allCardsHaveEqualLength(this.solution)) return false;
        return isSolutionValid(this.solution)
    }

    isFinalSolution() {
        if (!allCardsHaveEqualLength(this.solution)) return false;
        console.log('Desired', this.solution?.[0]?.length, this.desiredNumberOfSymbolsOnACard)
        if (this.solution?.[0]?.length !== this.desiredNumberOfSymbolsOnACard) return false;
        
        return isSolutionValid(this.solution)
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
            // this.addedCard is not restarted ! this.addedCard = [] somewhere
            // where is this.cardStartingSymbol incrementation?
            this.addedCard = [];
            this.addedCard.push(this.cardStartingSymbolIndex) // 20
            this.fillConnectedCards(); // 40
            this.fillRestrictedSymbols(this.addedCard, this.solution); // 50;
             console.log(this.connectedCards, this.restrictedSymbols)
            this.alreadyUsedSymbols.push(this.symbols[this.symbolIndex]);//60
            for (let symbolIndex = this.addedCard.length; symbolIndex < this.desiredNumberOfSymbolsOnACard; symbolIndex++) {
                const firstNotRestrictedSymbol = this.getFirstNotRestrictedSymbol(); // 70
                nextSymbolToUse = firstNotRestrictedSymbol;
                
                if (nextSymbolToUse === undefined) {
                    this.symbolIndex += 1;
                    nextSymbolToUse = this.symbols[this.symbolIndex];   
                }                               // 80
                this.addToAlreadyUsedSymbols(nextSymbolToUse); // 85
                this.addedCard.push(nextSymbolToUse); // 90
                const newlyAddedConnections = this.fillConnectedCards();
                this.fillRestrictedSymbols(this.addedCard, this.solution); // 110
                if (newlyAddedConnections.length === 0) {
                    const firstNotConnectedCard = this.getFirstNotConnectedCardIndex();
                    if (firstNotConnectedCard === -1) {
                        this.logTrace('Something went not as expected in solution generator. Symbol was added, but no new card was connected:');
                        debugger;
                        throw new Error('Alg failed')
                    }
                    if (this.solution.length - 1 < firstNotConnectedCard) debugger
                    this.solution[firstNotConnectedCard].push(this.nextSymbolToUse);
                } // 100
                this.fillConnectedCards(); // 110
                this.fillRestrictedSymbols(this.addedCard, this.solution); // 110;
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
            } // for
        } while (true); // Should be braken by return or error throw
        // At the end should return solution instead of do..while loop.
    }

}

export default CardsGenerator;