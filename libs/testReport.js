import ComponentCreator from './createAComponent.js';
import basicHTMLElementTypes from './basicElementTypes.js'

class TestReport {
    constructor() {
        this.testResults = [];
        this.componentCreator = new ComponentCreator();
    }
     
    runTests({testCases, testedFunction, /*matcher,*/ title}) {
        if (!Array.isArray(testCases)) throw new Error('testCases should be an array of test description objects');
        if (testCases.length === 0) return;
        const beforeEach = testCases[0].beforeEach || (() => {});
        console.group(title);
        // if (!matcher) matcher = (a, b) => a === b;
        testCases.forEach(testCase => {
            let { matcher } = testCase;
            if (!matcher) matcher = (a, b) => a === b;
            const beforeEachContext = beforeEach(testCases[0].beforeEachData);
            const tf = testedFunction === undefined ? testCase.testedFunction(testCase.mockData, beforeEachContext):testedFunction(testCases.mockData, beforeEachContext)
            const actualResult = tf(testCase.input);
            this.testResults.push({
                expected: testCase.expected,
                description:testCase.description,
                result: matcher(actualResult, testCase.expected),
            })
            console.log(testCase.description, {
                'Description': testCase.description,
                'Expected': testCase.expected,
                'Test outcome': matcher(actualResult, testCase.expected),
                'Calculated result': actualResult,
            })
        })
        console.groupEnd();
    }

    clearTestResults() {
        this.testResults = [];
    }

    TestTableRows() {
        return this.testResults.map((test, index) => {
            const testRowTemplate = {
                type: basicHTMLElementTypes.TR,
                className: test.result ? 'pass': 'fail',
                children: [
                    {
                        type:basicHTMLElementTypes.TD,
                        params: {
                            innerText: index,
                            className:  (test.result ? 'pass' : 'fail') + ' test-table-cell'
                        },
                    },
                    {
                        type:basicHTMLElementTypes.TD,
                        params: {
                            innerText: test.description,
                            className:  (test.result ? 'pass' : 'fail') + ' test-table-cell'
                        },
                    },
                    {
                        type:basicHTMLElementTypes.TD,
                        params: {
                            innerText: test.result,
                            className:  (test.result ? 'pass' : 'fail') + ' test-table-cell'
                        },
                    }
                ]
            };
            return testRowTemplate;
        })
    }

    createTestReport(){
        const testReportTemplate = {
            type: basicHTMLElementTypes.DIV,
            children: [
                {
                    type: basicHTMLElementTypes.H2,
                    params: {
                        innerText: this.title,
                        className: 'test-title'
                    },                        
                },
                {
                    type: basicHTMLElementTypes.TABLE,
                    params: {
                        className: 'test-table',
                    },
                    children: [
                        {
                            type: basicHTMLElementTypes.THEAD,
                            children: [
                                {
                                    type: basicHTMLElementTypes.TH,
                                    params:{
                                        innerText: 'Nr',
                                        className: 'test-table-head',
                                    }
                                },
                                {
                                    type: basicHTMLElementTypes.TH,
                                    params: {
                                        innerText: 'Description',
                                        className: 'test-table-head',
                                    }
                                },
                                {
                                    type: basicHTMLElementTypes.TH,
                                    params: {
                                        innerText: 'Test result',
                                        className: 'test-table-head',
                                    }
                                },

                            ]
                        },
                        {
                            type: basicHTMLElementTypes.TBODY,
                            children: this.TestTableRows(),
                        }
                    ]
                }
            ]
        };
        return this.componentCreator.createAComponent(testReportTemplate);
    }

    getTestReport({testCases, testedFunction, matcher, title}) {
        this.title = title;
        this.runTests({testCases, testedFunction, matcher, title});
        return this.createTestReport();
    }

}

export default TestReport;