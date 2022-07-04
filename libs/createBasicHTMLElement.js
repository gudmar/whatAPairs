import basicHTMLElementTypes from './basicElementTypes.js'

class BasicHTMLElementCreator {
    constructor() {

    }
    createBasicHTMLElement(type, params){
        console.log(params)
        let newElement = null;
        try{
            newElement = document.createElement(type)
        } catch(err) {
            console.error(`${this.constructor.name}, createBasicHTMLElement: ${type} element cannot be created. Original error: ${err}`)
        }
        if (params === undefined) return newElement;
        try{
            Object.keys(params).forEach(param => {
                // newElement.setAttribute(param, params[param])
                newElement[param] = params[param];
            });
        } catch(err) {
            console.error(`${this.constructor.name}, createBasicHTMLElement: ${type} cannot set one of attributes. Original error: ${err}`)
        }
        return newElement;
    }
}

export default BasicHTMLElementCreator;