import ComponentCreator from './createAComponent.js';
import basicHTMLElementTypes from './basicElementTypes.js'

class TestReport {
    constructor() {
        this.testResults = [];
        this.componentCreator = new ComponentCreator();
    }
     
    runTests(testCases, testedFunction) {
        testCases.forEach(testCase => {
            const tf = testedFunction === undefined ? testCase.testedFunction(testCase.data):testedFunction(testCase.data)
            this.testResults.push({
                expected: testCase.expected,
                description:testCase.description,
                result: tf === testCase.expected,
            })    
        })
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
                            className:  test.result ? 'pass' : 'fail' + ' test-table-cell'
                        },
                    },
                    {
                        type:basicHTMLElementTypes.TD,
                        params: {
                            innerText: test.description,
                            className: test.result ? 'pass' : 'fail' + ' test-table-cell'
                        },
                    },
                    {
                        type:basicHTMLElementTypes.TD,
                        params: {
                            innerText: test.result,
                            className: test.result ? 'pass' : 'fail' + ' test-table-cell'
                        },
                    }
                ]
            };
            return testRowTemplate;
        })
    }

    createTestReport(){
        const testReportTemplate = {
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
                                innerText: 'Result',
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
        return this.componentCreator.createAComponent(testReportTemplate);
    }

    getTestReport(testCases, testedFunction) {
        this.runTests(testCases, testedFunction);
        return this.createTestReport();
    }

}

export default TestReport;