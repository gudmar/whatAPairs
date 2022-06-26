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

export default printOriginalCards;