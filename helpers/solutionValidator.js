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

class ArrayElementsCounter {
    constructor(arr){
        this.mapObj = new Map();
        arr.forEach(item => this.mapObj.has(item) ? this.mapObj.set(item, this.mapObj.get(item) + 1):this.mapObj.set(item, 1));
    }
    log() {
        const output = [];
        this.mapObj.forEach((value, key) => output.push([key, value]))
        console.log(output);
    }
    keys(){
        const output = [];
        const keys = this.mapObj.keys();
        for(let key of keys) {
            output.push(key)
        }
        return output
    }
    values() {
        const output = [];
        const values = this.mapObj.values();
        for(let val of values) {
            output.push(val)
        }
        return output        
    }
    get(key) {
        return this.mapObj.get(key);
    }
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
    console.log(keysFromBothArrays.filter(key => countedElements.get(key) > 1))
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
   console.log(raport);
   return raport;
}

const isSolutionValid = solution => notValidCards(solution).length === 0

export {
    isSolutionValid,
    notValidCards,
    notValidCardsAboveIndex,
    haveCardsInSolutionUniqueSymbols,
    commonSymbolsBetweenArrays,
    areElementsOfArrayUnique, 
}