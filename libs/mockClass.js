class Mocker{
    constructor(){

    }
    mockParam(paramName, returnValue){
        this[paramName] = returnValue;
    }

    mockMethod(methodName, methodBody){
        this[`localCopy_${methodName}`] = methodBody;
        this[methodName] = (args) => this[`localCopy_${methodName}`].call(this, args)
    }

}

export default Mocker;