
class Injector {
    constructor(){

    }
    inject(component) {
        const root = document.getElementById('root');
        root.appendChild(component);
        
    }
    injectWhenReady(component) {
        window.addEventListener('DOMContentLoaded', inject(component));
    }
}

export default Injector;