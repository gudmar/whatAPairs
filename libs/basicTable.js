import ComponentCreator from './createAComponent.js';
import basicHTMLElementTypes from './basicElementTypes.js'


class BasicTable {
    constructor({
        tableClasses,
        headerClasses,
        thClasses,
        bodyClasses,
        trClasses,
        tdClasses,
    }) {
        this.ComponentCreator = new ComponentCreator();
        this.tableClasses = tableClasses || '';
        this.headerClasses = headerClasses || '';
        this.thClasses = thClasses || '';
        this.bodyClasses = bodyClasses || '';
        this.trClasses = trClasses || '';
        this.tdClasses = tdClasses || '';
    }

    createRow(elements, variant) {
        if (![basicHTMLElementTypes.TH, basicHTMLElementTypes, TD].includes(variant)) {
            throw new Error(`BasicTable creator: invalid row wariant: ${variant}`)
        }
        return  {
            type: basicHTMLElementTypes.TR,
            className: this.trClasses,
            children: elements.map((element, index) => {
                        return {
                            type:variant,
                            params: {
                                innerText: element,
                                className: variant === basicHTMLElementTypes.TD ? this.tdClasses: this.thClasses,
                            }
                        }
                    })
    
        }
    }
    createBody(rows){
        return {
            type: basicHTMLElementTypes.TBODY,
            className: this.bodyClasses,
            children: rows.map(row => this.createRow(row, basicHTMLElementTypes.TD))
        }
    }
    createHead(headArray) {
        return {
            type: basicHTMLElementTypes.THEAD,
            className: this.headerClasses,
            children: [
                this.createRow(headArray, basicHTMLElementTypes.TH)
            ]
        }
    }
    createTableTemplate({header, rows}){
        return {
            type: basicHTMLElementTypes.TABLE,
            className: this.tableClasses,
            children: [
                createHead(header),
                this.createBody(rows),
            ]
        }
    }
    create({header, rows}) {
        return this.ComponentCreator.createAComponent(this.createTableTemplate({header, rows}));

    }
}
export default(BasicTable);