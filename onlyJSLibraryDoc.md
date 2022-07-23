OnlyJS
======

The purpose of this little library and way of code is to make writing SPA in pure JS easy and standarized. 

Testing:
--------

1. **testReport.js** is responsible for creation of a ready element that may be injected to the _html_ site with **Injector.inject** function.
Tests are styled in **testReport.css**.
There is a **getTestReport({testCases, testTitle})** method that creates the test report. **{testCases}** is an array of objects. Each object in this array is a single _test case_ that takes:
Key | Is mandatory | What for
--- | --- | ---
*beforeEach* | Not mandatory | A function that may take a key from _beforeEachData_. Returns a new instance of tested object. This function is 
run before each test case. This function *should be placed only in first test cases array element*. If placed anywhere else, will have no effect
*beforeEachData* | Not mandatory | Should be placed only in first test case. Delivers data for the _beforeEach_ function
*description* | Not mandatory, but nice to have | the description that will be visible in test report
*mockData* | Not mandatory | If tested object has to have its state some how prepared before test is executed, data do perform this preparation should be placed here
*input* | Not mandatory | Tested function is run with data placed here,
*expected* | Mandatory | Expected result of the test
*testedFunction* | Mandatory | High order function (function returning a function). **(testCase.mockData, beforeEachContext) => {return testedFunction(testCase.input)}** so takes mockData, data returned by the _beforeEach_ function and returns a function that takes _testCase.input_ and returns the result. This function should mock everything, prepare tested object instances, mock everything and return a function that takes the _input_ and returns the test result.
**matcher** | Not mandatory | a function that takes 2 results (calculated by tested function and expected), compares them and returns the result. Matchers should be placed in _libs/testMatchers.js_ file. All functions for matchers should be placed in _libs/testMatchresFunctions.js_

2. **mockClass.js:Mocker** is a class that mocks a class. It has 2 methods that may add a field to the class or a new method. Methods should return 
a constant static value. Everything added to this class with mocking methods should be calculated manualy. No automation, as we do not want to test some additional calculations. We only test the tested code.
Method | What for
---|---
**mockParam(paramName, returnValue)** | takes paramName and value that should be associated with this apram. Now every time this calss instance is quired for this parameter name, it will return defined value.
**mockMethod(methodName, methodBody)** | adds a new method to this class instance. Every time this class instance is called queried for this method name it will run defined method body with params added to query. Methos body should always return a static value, as no calculations on this side of tests is desired. Otherwise not only tested code is tested but also those calculations

Creation of HTML elements
-------------------------

There is a custom web element api in js, that allows to create an encapsulated html element together with encapsulated css, lifecycle methods etc. Such registered html custom web element will be visible in html file, and will be added with defined html tag. However it is a bit complicated to 
communicate those html elemnets, and share state. It is possible, but passing a JS object containing 1Mb of data may not look nice in debugg pannel. This is the reason to come up with some different way of creating and communicating elements.

1. basicElementTypes.js
2. **BasicHTMLElementCreator** has a method **createBasicHTMLElement(type, params)**
3. **BasicHTMLElementCreatorRegister** in **createRegisterBaicHTMLElement.js** 
4. **BasicTable** in **basicTable.js** class creates a basic HTML table element out of array of arrays. **BasicTable** constructor takes an object with:
Paramenter | Description
---|---
**tableClasses** | styling in a js object maner to style table tag of the html table
**headerClasses** | styling in a js object maner to style thead tag of the html table
**thClasses** | styling in a js object maner to style th tags
**bodyClasses** | styling in a js object maner to style tbody tag
**trClasses** | styling in a js object maner to style tr tag
**tdClasses** | styling in a js object maner to style td tag

**create({header, rows})** is the method that will return the ready object that may be injected to the html with a common **appendChild** method. Header is an array of header cell elements and rows is the array of arrays. Each array element of rows is the array with data displayed in td elements later.