import IdGetter from './idGetter.js';
import BasicHTMLElementCreator from './createBasicHTMLElement';

class BasicHTMLElementCreatorRegister {
    constructor() {
        if (BasicHTMLElementCreatorRegister.instance === undefined) {
            BasicHTMLElementCreatorRegister.instance = this;
            BasicHTMLElementCreatorRegister.elementRegister = [];
            BasicHTMLElementCreatorRegister.elementCreator = new BasicHTMLElementCreator();
            BasicHTMLElementCreatorRegister.idProvider = new IdGetter();
        } else {
            return BasicHTMLElementCreatorRegister.instance
        }
    }

    createAndRegister(type, props, events){
        let newElement = BasicHTMLElementCreatorRegister.elementCreator.createBasicHTMLElement(type, props);
        try{
            events.forEach(event => newElement.addEventListener(event.type, event.callback))
        } catch(err) {
        }
        BasicHTMLElementCreatorRegister.elementRegister.push({
            reference: newElement,
            id: BasicHTMLElementCreatorRegister.idProvider,
            events: events,
        })
        return newElement;
    }

    findElementById(id){
        return BasicHTMLElementCreatorRegister.elementRegister.find((element => element.id === id))
    }
    findElementByRef(ref) {
        return BasicHTMLElementCreatorRegister.elementRegister.find((element => element.reference === ref))
    }
    removeElement(elementInRegister) {
        elementInRegister.events.forEach(event => elementInRegister.removeEventListener(event.type, event.callback));
        elementInRegister.remove();
    }
    removeElementById(id) {this.removeElement(this.findElementById(id))}
    removeElementByRef(ref) {this.removeElement(this.findElementByRef(ref))}
}

export default BasicHTMLElementCreatorRegister;