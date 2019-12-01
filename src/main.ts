//https://github.com/hammerjs/hammer-time

class RibbonController {    
    constructor() {
        for(var i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].ownerNode["id"] == "ribbon") {
                this._style = (<any>document.styleSheets[i]).cssRules[0].style;                                
            }
        }
    }
    static get instance() {
        if(this._instance == null) {
            this._instance = new RibbonController();
        }
        return this._instance;
    }

    private static _instance: RibbonController;

    public translate = (options: { element:HTMLElement, deltaX: number }) => {
        
        const body = options.element.querySelector(".ribbon__body") as HTMLElement;

        if(options.element.offsetWidth < body.offsetWidth) {
        
            this._deltaX = this._deltaX + options.deltaX;

            if(this._deltaX <=  options.element.offsetWidth - body.offsetWidth)            
                this._deltaX = options.element.offsetWidth - body.offsetWidth;
            
            if(this._deltaX > 0)          
                this._deltaX = 0;            
        }

        this._style.transform = `translateX(${this._deltaX}px)`;
    }

    private _style:any;

    private _deltaX: number = 0;    
}

class Ribbon {

    constructor(element: HTMLElement = null) {
        this._element = element;
        this._registerEventListeners();            
    }

    private _registerEventListeners() {
        this._hammerManager = new Hammer(this._element);
        this._hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 1, velocity: 0.1 });
        this._hammerManager.on("swipeleft swiperight",this._handleSwipe);                
    }
    
    private _handleSwipe = (e) => {        
        if(e.type === "swipeleft")
            RibbonController.instance.translate({
                deltaX: -1 * this._body.offsetWidth / this._numberOfItems,
                element: this._element
            });

        if(e.type === "swiperight")
            RibbonController.instance.translate({
                deltaX: 1 * this._body.offsetWidth / this._numberOfItems,
                element: this._element
            });            

    }

    static mount(element:HTMLElement = document.querySelector("body")) {
        var elements = element.querySelectorAll(".ribbon") as NodeListOf<HTMLElement>;

        for(var i = 0; i < elements.length; i++) {
            new Ribbon(elements[i]);
        }
    }

    private _element: HTMLElement;
    private _hammerManager: HammerManager;
    private get _body():HTMLElement { return this._element.querySelector(".ribbon__body") as HTMLElement; }    
    private get _numberOfItems():number { return this._element.querySelectorAll(".ribbon__cell").length; } 
}

document.addEventListener("readystatechange",() => {
    if(document.readyState == "complete")
        Ribbon.mount();    
})