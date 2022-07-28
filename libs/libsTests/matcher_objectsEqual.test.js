
import { objectsEqual } from '../testMatchers.js'

const objectsEqual_TC = [
    {
        mockData: {},
        description: '1. Expect 2 equal primitives to be equal',
        expected: true,
        input: {
            obj1: 2,
            obj2: 2,
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '2. Expect 2 not equal primitives to be not equal',
        expected: false,
        input: {
            obj1: 1,
            obj2: 2,
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '3. Expect 2 not nested objects that have the same keys and the same values to be equal',
        expected: true,
        input: {
            obj1: {a: 1, b: 2},
            obj2: {a: 1, b: 2},
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '4. Expect 2 not nested objects that have different key/value pair to be different',
        expected: false,
        input: {
            obj1: {a: 1, b: 2, c: '3', d: 5},
            obj2: {a: 1, b: 2, c: 3, d: 5},
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '5. Expect 2 nested objects that have same values and keys to be equal',
        expected: true,
        input: {
            obj1: {
                name: 'Antoni',
                familyName: 'Kowalski',
                skills: {
                    climbing: 10,
                    playingInstruments: {
                        guitar: 5,
                        percusion: 4,
                    }
                }
            },
            obj2: {
                name: 'Antoni',
                familyName: 'Kowalski',
                skills: {
                    climbing: 10,
                    playingInstruments: {
                        guitar: 5,
                        percusion: 4,
                    }
                }
            },
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '6. Expect 2 nested objects that have different values somewhere to be not equal',
        expected: false,
        input: {
            obj1: {
                name: 'Antoni',
                familyName: 'Kowalski',
                skills: {
                    climbing: 10,
                    playingInstruments: {
                        guitar: 5,
                        percusion: 4,
                    }
                }
            },
            obj2: {
                name: 'Antoni',
                familyName: 'Kowalski',
                skills: {
                    climbing: 10,
                    playingInstruments: {
                        guitar: 5,
                        percusion: 3,
                    }
                }
            },
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '7. Expect 2 equal arrays to be equal',
        expected: true,
        input: {
            obj1: [1, 2, 3, 4, 5],
            obj2: [1, 2, 3, 4, 5],
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '8. Expect 2 arrays with a different element not to be equal: different element type',
        expected: false,
        input: {
            obj1: [1, 2, 3, '4', 5],
            obj2: [1, 2, 3, 4, 5],
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '9. Expect 2 arrays with a different elements not to be equal',
        expected: false,
        input: {
            obj1: [1, 2, 5],
            obj2: [1, 2, 3, 4, 5],
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '10. Expect 2 identical objects containing arrays to be equal',
        expected: true,
        input: {
            obj1: {
                person: 'Antoni Kowalski',
                age: '86',
                pets: {
                    dogs: ['Reksio', 'Azor'],
                    cats: ['Filemon', 'Luna', 'Sola'],
                },
                cars: ['Trabant', 'Warburg', 'Tarpan']
            },
            obj2: {
                person: 'Antoni Kowalski',
                age: '86',
                pets: {
                    dogs: ['Reksio', 'Azor'],
                    cats: ['Filemon', 'Luna', 'Sola'],
                },
                cars: ['Trabant', 'Warburg', 'Tarpan']
            },
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '11. Expect 2 nested objects containig arrays, that have an array value different to be not equal',
        expected: false,
        input: {
            obj1: {
                person: 'Antoni Kowalski',
                age: '86',
                pets: {
                    dogs: ['Reksio', 'Azor'],
                    cats: ['Filemon', 'Luna', 'Sola'],
                },
                cars: ['Trabant', 'Warburg', 'Polonez']
            },
            obj2: {
                person: 'Antoni Kowalski',
                age: '86',
                pets: {
                    dogs: ['Reksio', 'Azor'],
                    cats: ['Filemon', 'Luna', 'Sola'],
                },
                cars: ['Trabant', 'Warburg', 'Tarpan']
            },
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
    {
        mockData: {},
        description: '12. Expect 2 different objects with nested objects and arrays having objects and difference in those objects to be different',
        expected: false,
        input: {
            obj1: {
                person: 'Antoni Kowalski',
                age: '86',
                pets: {
                    dogs: ['Reksio', 'Azor'],
                    cats: ['Filemon', 'Luna', 'Sola'],
                },
                cars: [
                    {
                        make: 'Skoda',
                        model: 'Favorit',
                        year: '1992',
                        additional: ['halogen lights'],
                        adventures: [
                            {
                                where: 'Croatia',
                                year: '1995',
                                visited: ['a', 'b', 'c']
                            },
                            {
                                where: 'Spain',
                                year: '1996',
                                visited: ['d', 'e']
                            }
                        ]
                    },
                    {
                        make: 'Volkswagen',
                        model: 'Transporter',
                        year: '1993',
                        additional: ['ABS', 'Air conditioning'],
                        adventures: [
                            {
                                where: 'Italia',
                                year: '1997',
                                visited: ['a', 'b', 'c']
                            },
                            {
                                where: 'France',
                                year: '1998',
                                visited: ['d', 'e']
                            }
                        ]

                    }
                ]
            },
            obj2: {
                person: 'Antoni Kowalski',
                age: '86',
                pets: {
                    dogs: ['Reksio', 'Azor'],
                    cats: ['Filemon', 'Luna', 'Sola'],
                },
                cars: [
                    {
                        make: 'Skoda',
                        model: 'Favorit',
                        year: '1992',
                        additional: ['halogen lights'],
                        adventures: [
                            {
                                where: 'Croatia',
                                year: '1995',
                                visited: ['a', 'b', 'c']
                            },
                            {
                                where: 'Spain',
                                year: '1996',
                                visited: ['d', 'e']
                            }
                        ]
                    },
                    {
                        make: 'Volkswagen',
                        model: 'Transporter',
                        year: '1993',
                        additional: ['ABS', 'Air conditioning'],
                        adventures: [
                            {
                                where: 'Italia',
                                year: '1997',
                                visited: ['a', 'b', 'c']
                            },
                            {
                                where: 'France',
                                year: '1998',
                                visited: ['d', 'e!!!!!!!!!!!!']
                            }
                        ]

                    }
                ]
            },
        },
        testedFunction: () => {
            return ({obj1, obj2}) => objectsEqual(obj1, obj2);
        },
        matcher: (a, b) => a === b
    },
]

export {
    objectsEqual_TC
}