import ArrayElementsCounter from '../arrayElementsCounter.js';
import { isSolutionValid, allCardsHaveEqualLength } from '../solutionValidator.js'



class CardsGenerator {
    constructor() {
        this.solutionHolder = new SolutionManager();
        this.addedCard = [];
        this.restrictedSymbolsManager = new RestrictedSymbolsManager();
        this.cardsConnectedToCurrentCard = [];
        this.symbolOccurence = {};
    }
}

export default CardsGenerator;

// start solution
// do
// 	Add new card
// 	insert start symbol
// 	increase start symbol
// 	fill connected cards, fill restricted symbols
// 	do
// 		find first not connected card and first not restricted symbol
// 		connect not connected card
// 		fill connected cards, fill restricetd symbols
// 		if (first not restricted symbol === undefined) error
// 	while first not connected card != -1
// 	add created card to te solution, and set [] to addedCard
// 	if (partial solutino) yield partialSolution
	
// 	if (symbol repeats too many times) error 
// 	if (card has too many symbols) error
// 	if (newly added connections === 0 and first not connected card === -1) error
// while not final solution