import ArrayElementsCounter from './arrayElementsCounter.js'

const countElementsOfArray = (arr) =>{
    return arr.reduce((acc, item) =>{
       if (acc[item] === undefined) {
           acc[item] = 1;
       } else {
           acc[item] += 1;
       }
       return acc;
   }, {})
}

const areElementsOfArrayUnique = (arr) => {
    const countedElements = new ArrayElementsCounter(arr);
    countedElements.log();
    const values = countedElements.values();
    return !values.some(item => item > 1)
}

const commonSymbolsBetweenArrays = (arr1, arr2) => {
    
    const joinedArrays = [...arr1, ...arr2];
    const countedElements = new ArrayElementsCounter(joinedArrays);
    const keysFromBothArrays = countedElements.keys();
    countedElements.log();
    return keysFromBothArrays.filter(key => countedElements.get(key) > 1);
}
 
// CORRECT BELOW USING NEW ArrayElementsCounter

const haveCardsInSolutionUniqueSymbols = (solution) => {
   return solution.every(card => areElementsOfArrayUnique(card))
}

const notValidCardsAboveIndex = (solution, index) => {
   if (solution.length <= index + 1) throw new Error('Given index >= solution.length')
   const cardAtIndex = solution[index];
   const cardsFromIndex = solution.slice(index + 1);
   return cardsFromIndex.reduce((raport, card) => {
       const commonSymbols = commonSymbolsBetweenArrays(cardAtIndex, card);
       if (commonSymbols.length > 1) {
           raport.push({
               cardA: cardAtIndex,
               cardB: card,
               repeatingSymbols: commonSymbols,
               reason: 'Too many connections'
           })
           
       }
       if (commonSymbols.length === 0) {
           raport.push({
               cardA: cardAtIndex,
               cardB: card,
               reason: 'Not enough connections'
           })
       }
       return raport
   }, [])
}

const notValidCards = solution => {
   if (!Array.isArray(solution)) throw new Error('notValidCards: solution is not an array')
   if (solution.length < 3) throw new Error('notValidCards: solution should be at least an array of 3 elements')
   const raport = [];
   for (let index = 0; index < solution.length - 1; index++) {
       const partRaport = notValidCardsAboveIndex(solution, index);
       if (partRaport.length > 0) raport.push(partRaport);
   }
   return raport;
}

const allSymbolsRepeatDesiredNrOfTimes = solution => {

    if (!Array.isArray(solution)) throw new Error('solutionValidator: allSymbolsRepeatDesiredNrOfTimes -> solutio is not an array')
    const solutionSymbolCounter = new ArrayElementsCounter(solution.flat());
    const desiredNumberOfRepetitions = solution[0].length;
    if (solution.some(card => card.length !== desiredNumberOfRepetitions)) return false;
    const symbolRepetitions = solutionSymbolCounter.values();
    const result = symbolRepetitions.every(nrOfRepetitions => nrOfRepetitions === desiredNumberOfRepetitions);
    return symbolRepetitions.every(nrOfRepetitions => nrOfRepetitions === desiredNumberOfRepetitions);
}

const allCardsHaveEqualLength = (solution) => {
    const nrOfCards = solution[0].length;
    return solution.every(card => card.length === nrOfCards)
}

const allCardsConnectedWithSilgleSymbol = solution => notValidCards(solution).length === 0;

const isSolutionValid = solution => {
    if (!allSymbolsRepeatDesiredNrOfTimes(solution)) return false;
    return notValidCards(solution).length === 0
}

export {
    isSolutionValid,
    notValidCards,
    notValidCardsAboveIndex,
    haveCardsInSolutionUniqueSymbols,
    commonSymbolsBetweenArrays,
    areElementsOfArrayUnique, 
    allCardsHaveEqualLength,
    allSymbolsRepeatDesiredNrOfTimes,
    allCardsConnectedWithSilgleSymbol
}