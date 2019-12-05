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

        const container = options.element.querySelector(".ribbon__bodyContainer") as HTMLElement;

        if(container.offsetWidth < body.offsetWidth) {

            this._deltaX = this._deltaX + options.deltaX;

            if(this._deltaX <=  container.offsetWidth - body.offsetWidth)            
                this._deltaX = container.offsetWidth - body.offsetWidth;
            
            if(this._deltaX > 0)          
                this._deltaX = 0;            
        }

        this._style.transform = `translateX(${this._deltaX}px)`;
    }

    private _style:any;

    private _deltaX: number = 0;    
}

class Ribbon {

    constructor(element: HTMLElement) {
        this._element = element;
        this._registerEventListeners();        
        this._numberOfItems = this._element.querySelectorAll(".ribbon__cell").length;           
    }

    private _registerEventListeners() {
        this._element.addEventListener("mousedown",this._handleMouseDown);
        this._element.addEventListener("mouseup",this._handleMouseUp);
        this._element.addEventListener("touchstart", this._handleTouchStart);
        this._element.addEventListener("touchmove", this._handleTouchMove);
        this._element.addEventListener("touchend", this._handleTouchEnd);
    }

    private _handleMouseDown = (e:MouseEvent) => {
        this._touchStart.x = e.offsetX;
        this._touchStart.y = e.offsetY;
        this._touchStart.timestamp = Date.now();
    }

    private _handleMouseUp = (e:MouseEvent) => {
        this._touchMove.x = e.offsetX;
        this._touchMove.y = e.offsetY;  
        this._touchMove.timestamp = Date.now(); 
        this._handleTouchEnd();
    }

    private _handleTouchStart = (e: TouchEvent) => {        
        this._touchStart.x = e.touches[0].pageX;
        this._touchStart.y = e.touches[0].pageY;
        this._touchStart.timestamp = Date.now();            
    }

    private _handleTouchMove = (e:TouchEvent) => {
        this._touchMove.x = e.touches[0].pageX;
        this._touchMove.y = e.touches[0].pageY;
        this._touchMove.timestamp = Date.now();     
    }

    private _handleTouchEnd = () => {
        const absY = Math.abs(this._touchStart.y - this._touchMove.y);
        const absX = Math.abs(this._touchMove.x - this._touchStart.x);
        const absTime = Math.abs(this._touchStart.timestamp - this._touchMove.timestamp);

        if(absY > 40 || absTime > 200 || absX < 100) return;

        if(this._touchStart.x - this._touchMove.x > 0) {
            RibbonController.instance.translate({
                deltaX: -1 * this._body.offsetWidth / this._numberOfItems,
                element: this._element
            });
        } else {
            RibbonController.instance.translate({
                deltaX: 1 * this._body.offsetWidth / this._numberOfItems,
                element: this._element
            });
        }
    }

    static mount(element:HTMLElement = document.querySelector("body")) {
        var elements = element.querySelectorAll(".ribbon") as NodeListOf<HTMLElement>;

        for(var i = 0; i < elements.length; i++) {
            new Ribbon(elements[i]);
        }
    }

    private _touchStart: { x:number, y:number, timestamp:number } = <any>{};
    private _touchMove: { x:number, y:number, timestamp:number } = <any>{};
    private _element: HTMLElement;
    private get _body():HTMLElement { return this._element.querySelector(".ribbon__body") as HTMLElement; }    
    private _numberOfItems:number; 
}

document.addEventListener("readystatechange",() => {
    if(document.readyState == "complete")
        Ribbon.mount();    
})