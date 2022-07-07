
import BasicHTMLElementCreator from './createBasicHTMLElement.js';
import basicHTMLElementTypes from './basicElementTypes.js';

class ComponentCreator {
    constructor() {
        this.htmlElementCreator = new BasicHTMLElementCreator()
    }
    createAComponent(template, handlers) {
        const {
            type,
            children,
            params,
        } = template;
        if (!Object.values(basicHTMLElementTypes).find(supportedType => supportedType === type)) {
            console.error(`Type ${type} is not supported`)
            return;
        }
        const element = this.htmlElementCreator.createBasicHTMLElement(type, params);
        if (children === undefined) return element;
        children.forEach((child) => {
            element.appendChild(this.createAComponent(child, child.handlers))
        })
        return element;
    }

}

export default ComponentCreator;