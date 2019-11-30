class RibbonTranslateCoordiantor {    
    static get instance() {
        if(this._instance == null) {
            this._instance = new RibbonTranslateCoordiantor();
        }
        return this._instance;
    }

    private static _instance: RibbonTranslateCoordiantor;

    public translate = (options: { element:HTMLElement, deltaX: number }) => {
        
        if(options.element.offsetWidth >= 1170) return false;
        
        var body = options.element.querySelector(".ribbon__body") as HTMLElement;

        const newDeltax =  this._deltaX + options.deltaX;

        if(newDeltax >  options.element.offsetWidth - body.offsetWidth) {            
            this._deltaX = newDeltax;            
        } else {
            this._deltaX = options.element.offsetWidth - body.offsetWidth;
        }
    
        if(newDeltax > 0)          
            this._deltaX = 0;            
        
        for(var i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].ownerNode["id"] == "ribbon") {
                (<any>document.styleSheets[i]).cssRules[0].style.transform = `translateX(${this._deltaX}px)`;                
            }
        }
    }

    private _deltaX: number = 0;    
}

class Ribbon {

    constructor(element: HTMLElement = null) {
        this._element = element;
        this._registerEventListeners();            
    }

    private _registerEventListeners() {
        this._hammerManager = new Hammer(this._element);
        this._hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this._hammerManager.on("swipeleft swiperight",this._handleSwipe);                
    }
    
    private _handleSwipe = (e) => {            
        RibbonTranslateCoordiantor.instance.translate({
            deltaX: e.deltaX,
            element: this._element
        });
    }

    static mount(element:HTMLElement) {
        var elements = element.querySelectorAll(".ribbon") as NodeListOf<HTMLElement>;

        for(var i = 0; i < elements.length; i++) {
            new Ribbon(elements[i]);
        }
    }

    private _element: HTMLElement;
    private _hammerManager: HammerManager;    
}

document.addEventListener("readystatechange",() => {
    if(document.readyState == "complete")
        Ribbon.mount(document.querySelector("body"));    
})