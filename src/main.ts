class RibbonEvents {
    public static readonly reset = "RESET";
    public static readonly translate = "TRANSLATE";
}

class CustomEventDispatcher {
    static dispatch(element:HTMLElement, type:string, payload = null) {
        element.dispatchEvent(new CustomEvent(type,{ bubbles: true, detail: payload }))
    }
}

class Ribbon {

    constructor(element: HTMLElement, $document: Document, $window: Window) {
        this._element = element;
        this._document = $document;
        this._window = $window;
        this._registerEventListeners();
        CustomEventDispatcher.dispatch(this._element, RibbonEvents.reset);
    }

    private _registerEventListeners() {
        this._hammerManager = new Hammer(this._element);
        this._hammerManager.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this._hammerManager.on("panmove",this._handlePanMove);
        this._document.addEventListener(RibbonEvents.translate,this._handleTranslate);
        this._window.addEventListener("resize", this._handleResize);
        this._document.addEventListener(RibbonEvents.reset, this._handleReset);
    }
    
    private _handleTranslate = (e: CustomEvent) => {
        
        if(this._element.offsetWidth >= 1170) return false;
        
        const newDeltax =  this._deltaX + e.detail.deltaX;

        if(newDeltax >  this._element.offsetWidth - this._body.offsetWidth) {            
            this._deltaX = newDeltax;            
        } else {
            this._deltaX = this._element.offsetWidth - this._body.offsetWidth;
        }
    
        if(newDeltax > 0)          
            this._deltaX = 0;            
        
        this._body.style.transform = `translateX(${this._deltaX}px)`;
    }

    private _handlePanMove = (e) => {            
        CustomEventDispatcher.dispatch(this._element, RibbonEvents.translate, { deltaX: e.deltaX });
    }

    private _handleReset = (e) => {
        this._deltaX = 0;
        this._body.style.transform = `translateX(${this._deltaX}px)`;
    }

    private _handleResize = (e) => {
        CustomEventDispatcher.dispatch(this._element, RibbonEvents.reset);
    }

    static mount(element:HTMLElement) {
        var elements = element.querySelectorAll(".ribbon") as NodeListOf<HTMLElement>;

        for(var i = 0; i < elements.length; i++) {
            new Ribbon(elements[i], document,window);
        }
    }

    private _deltaX = 0;
    private _element: HTMLElement;
    private _hammerManager: HammerManager;
    private get _body(): HTMLElement { return this._element.querySelector(".ribbon__body") as HTMLElement; };
    private _document: Document;
    private _window: Window;
}

document.addEventListener("readystatechange",() => {
    if(document.readyState == "complete")
        Ribbon.mount(document.querySelector("body"));    
})