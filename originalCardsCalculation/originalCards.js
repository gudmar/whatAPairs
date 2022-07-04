import ComponentCreator from "../libs/createAComponent.js";
import basicHTMLElementTypes from "../libs/basicElementTypes.js";

const cards = [
    {
       content: ['sierp', 'kogut', 'studnia', 'kaczka', 'kura', 'strach'],
       big: 'sierp'
    },
    {
        content: ['koza', 'grabie', 'cebula', 'sierp', 'świnia', 'rolnik'],
        big: 'świnia'
    },
    {
        content: ['wieśniaczka', 'krowa', 'traktor', 'sierp', 'brona', 'dynia'],
        big: 'wieśniaczka'
     },
     {
        content: ['indyk', 'owca', 'kot', 'sierp' ,'kosa', 'rzodkiew'],
        big: 'indyk'
     },
     {
        content: ['kombain', 'dynia', 'kot', 'ul', 'kaczka', 'rolnik'],
        big: 'kombain'
     },
     {
        content: ['kogut', 'stodoła','kot', 'pień', 'cebula', 'brona'],
        big: 'kogut'
     },
     {
        content: ['wiatrak', 'rolnik', 'kura', 'stodoła', 'wieśniaczka','indyk'],
        big: 'wiatrak'
     },
     {
        content: ['kot', 'świnia', 'wiatrak' ,'słoma', 'krowa', 'studnia'],
        big: 'kot'
     },
     {
        content: ['grabie', 'pień','kaczka', 'słoma', 'kosa', 'wieśniaczka'],
        big: 'grabie'
     },
     {
        content: ['rolnik', 'płot', 'krowa', 'pień', 'rzodkiew', 'strach'],
        big: 'rolnik'
     },
     {
        content: ['płot', 'kombain', 'owca', 'studnia', 'cebula', 'wieśniaczka'],
        big: 'płot'
     },
     {
        content: ['stodoła', 'płot', 'ul', 'sierp', 'słoma', 'kłos'],
        big: 'stodoła'
     },
     {
        content: ['dynia', 'płot', 'wiatrak', 'kogut', 'koza', 'kosa'],
        big: 'dynia'
     },
     {
        content: ['strach', 'kosa', 'świnia', 'kombain','stodoła', 'traktor'],
        big: 'strach'
     },
     {
        content: ['wieśniaczka', 'strach', 'buda', 'kot','kłos', 'koza'],
        big: 'wieśniaczka'
     },
     {
        content: ['ul', 'owca', 'brona', 'strach','grabie', 'wiatrak'],
        big: 'ul'
     },
     {
        content: ['rzodkiew', 'ul', 'widły', 'wieśniaczka', 'kogut', 'świnia'],
        big: 'rzodkiew'
     },
     {
        content: ['kosa','rolnik', 'brona', 'widły', 'kłos', 'studnia'],
        big: 'kosa'
     },
     {
        content: ['owca', 'kura','kłos','świnia','dynia','pień'],
        big: 'owca'
     },
     {
        content: ['widły','strach','indyk','dynia','słoma','cebula'],
        big: 'widły'
     },
     {
        content: ['słoma','rolnik','buda','kogut','traktor','owca'],
        big: 'słoma'
     },
     {
        content: ['koza','kombain','brona','kura','słoma','rzodkiew'],
        big: 'koza'
     },
     {
        content: ['pień','kombain','sierp','wiatrak','buda','widły'],
        big: 'pień'
     },
     {
        content: ['kłos','kombain','grabie','krowa','indyk','kogut'],
        big: 'kłos'
     },
     {
        content: ['studnia','rzodkiew','grabie','dynia','buda','stodoła'],
        big: 'studnia'
     },
     {
        content: ['kaczka','świnia','płot','indyk','buda','brona'],
        big: 'kaczka'
     },
     {
        content: ['krowa','stodoła','widły','kaczka','koza','owca'],
        big: 'krowa'
     },
     {
        content: ['buda','cebula','kosa','ul','krowa','kura'],
        big: 'buda'
     },
     {
        content: ['kura','traktor','kot','grabie','widły','płot'],
        big: 'kura'
     },
     {
        content: ['cebula','rzodkiew','traktor','wiatrak','kłos','kaczka'],
        big: 'cebula'
     },
     {
        content: ['traktor','indyk','pień','studnia','ul','koza'],
        big: 'traktor'
     }, 
]

function incrementObject(obj, prop) {
    if (!obj[prop]){
        obj[prop] = 1;
    } else {
        obj[prop] += 1;
    }
}

function countCards() {
    let nrOfCards = 0;
    const bigCards = {};
    let symbolStatistics = {};
    cards.forEach(card => {
        nrOfCards++;
        incrementObject(bigCards, card['big']);
        card.content.forEach(symbol => {
            incrementObject(symbolStatistics, symbol);
        })
    });
    return {
        nrOfCards: nrOfCards,
        bigCards: bigCards,
        symbolStatistics:symbolStatistics
    }
}

function printOriginalCards(){
    console.dir(countCards())
}

function performOperationForEachSymbol(cards, callback) {
    let calculatedValue = undefined;
    cards.forEach((card, cardIndex) => {
        card.forEach((symbol, symbolIndex) => {
            calculatedValue = callback({card, cardIndex, symbol, symbolIndex})
        })
    })
    return calculatedValue;
}

function createMapping(originalCards) {
    const mapping = {};
    let index = 1;
    const mapCards = ({card, symbol}) => {
        if (mapping[symbol] === undefined) {
            mapping[symbol] = index;
            index++;
        }
        return mapping
    }
    return performOperationForEachSymbol(originalCards, mapCards);
}

function createArrayOfItems(nrOfItems, itemToSet) {
    return Array(nrOfItems).fill().map((_) => itemToSet);
}
function create2DimArray(i, j, calculateItem = () => undefined) {
    const arr = [];
    function createVector(i, j){
        const v = [];
        for(let index = 0; index < i; index++){v.push(calculateItem(i, j))}
        return v
    }
    for (let index = 0; index < j; index++){
        arr.push(createVector(i,j))
    }
    return arr
}

function mapWordsToNumbers(originalCards) {
    const mappingDictionary = createMapping(originalCards);
    const mapped = create2DimArray(6, 31)
    const mapFunction = ({card, cardIndex, symbol, symbolIndex}) => {
        const wordSymbol = originalCards[cardIndex][symbolIndex];
        const digitSymbol = mappingDictionary[wordSymbol];
        mapped[cardIndex][symbolIndex] = digitSymbol;
    }
    performOperationForEachSymbol(originalCards, mapFunction);
    return mapped;
}

function createCardComponent(symbolsArr) {
        return {
            type: basicHTMLElementTypes.TR,
            children: symbolsArr.map(
                symbol => ({
                    type: basicHTMLElementTypes.TD,
                    params: {
                            innerText: symbol,
                        }
                    
                })
            )
        }
    }

function cardsPresentationComponent(cardsArr = mapWordsToNumbers(cards.map(card => card.content))){
    const componentCreator = new ComponentCreator();
    const _children = cardsArr.map((card) => 
        createCardComponent(card)
        // createCardComponent(card.content)
    )
    const template = {
        type: basicHTMLElementTypes.TABLE,
        children: [
            {
                type: basicHTMLElementTypes.TBODY,
                children: _children
            }
        ]
    }
    return componentCreator.createAComponent(template)
}


export {
    printOriginalCards,
    cardsPresentationComponent,
}