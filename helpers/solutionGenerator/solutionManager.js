class SolutionManager {
    constructor() {
        const baseSolution = [
            [0,  2],
            [0,  1],
            [1,  2],
        ];
        this._solution = baseSolution;
        this.symbolRepetitions = this.countAllSymbols();
    }
    get solution() {return this._solution};

    countAllSymbols() {
        this.symbolRepetitions = {};
        const flatSolution = this._solution.flat();
        const result = flatSolution.reduce((prev, item) => {
            if (prev[item] === undefined) prev[symbol] = 0;
            else prev[symbol] += 1;
        },{})
        this.symbolRepetitions = result;
    }

    getSymbolRepetition(symbol){
        this.countAllSymbols();
        return this.symbolRepetitions[symbol];
    }

    allCardsHaveEqualLength() {
        const nrOfCards = this.solution[0].length;
        return this.solution.every(card => card.length === nrOfCards)
    }

    isPartialSolution(){
        if (!allCardsHaveEqualLength(this.solution)) return false;
        return isSolutionValid(this.solution)
    }

    isFinalSolution() {
        if (!allCardsHaveEqualLength(this.solution)) return false;
        if (this.solution?.[0]?.length !== this.desiredNumberOfSymbolsOnACard) return false;
        
        return isSolutionValid(this.solution)
    }

    set card(card){
        this._solution.push(card);
    }

    getConnectedCards(card){
        const areCardsConnected = (cardA, cardB) => {
            const result = cardB.reduce((prev, symbol) => {
                if (cardA.includes(symbol)) prev = true;
                return prev;
            }, false)
            return result;
        }
        const result = this.solution.reduce((prev, solutionCard, index) => {
            if (areCardsConnected(solutionCard, card)) prev.push(index);
            return prev;
        }, [])
        return result;
    }


}
