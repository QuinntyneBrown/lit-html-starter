//console.log(document.styleSheets[0].ownerNode["id"]);





class RibbonEvents {
    public static readonly reset = "RESET";
    public static readonly translate = "TRANSLATE";
}

class CustomEventDispatcher {
    static dispatch(element:HTMLElement, type:string, payload = null) {
        element.dispatchEvent(new CustomEvent(type,{ bubbles: true, detail: payload }))
    }
}

class RibbonTranslateCoordiantor {
    constructor(element: HTMLElement) {
        this._element = element;
    }
    
    static initializeIfNull(element: HTMLElement) {
        if(this._instance == null) {
            this._instance = new RibbonTranslateCoordiantor(element);
            document.addEventListener(RibbonEvents.translate,this._instance.handleTranslate);
        }
    }

    private static _instance: RibbonTranslateCoordiantor;

    public handleTranslate = (e: CustomEvent) => {
        
        if(this._element.offsetWidth >= 1170) return false;
        
        const newDeltax =  this._deltaX + e.detail.deltaX;

        if(newDeltax >  this._element.offsetWidth - this._body.offsetWidth) {            
            this._deltaX = newDeltax;            
        } else {
            this._deltaX = this._element.offsetWidth - this._body.offsetWidth;
        }
    
        if(newDeltax > 0)          
            this._deltaX = 0;            
        
        for(var i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].ownerNode["id"] == "ribbon") {
                (<any>document.styleSheets[i]).cssRules[0].style.transform = `translateX(${this._deltaX}px)`;                
            }
        }
    }

    _element: HTMLElement;
    _deltaX: number = 0;
    private get _body(): HTMLElement { return this._element.querySelector(".ribbon__body") as HTMLElement; };
}

class Ribbon {

    constructor(element: HTMLElement = null) {
        this._element = element;
        this._registerEventListeners();    
        RibbonTranslateCoordiantor.initializeIfNull(element);
    }

    private _registerEventListeners() {
        this._hammerManager = new Hammer(this._element);
        this._hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this._hammerManager.on("swipeleft swiperight",this._handleSwipe);                
    }
    
    private _handleSwipe = (e) => {            
        CustomEventDispatcher.dispatch(this._element, RibbonEvents.translate, { deltaX: e.deltaX });
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