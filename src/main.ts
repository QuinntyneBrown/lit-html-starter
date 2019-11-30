class Strip {

    constructor(element: HTMLElement) {
        this._element = element;
        this._hammerManager = new Hammer(this._element);
        this._hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this._hammerManager.on("swipeleft swiperight",this._handlePanMove);
        this._setButtons();
    }

    private _handlePanMove = (e) => {
        if (this._element.offsetWidth >= 1170) return false;

        this._deltaX = this._deltaX + e.deltaX;

        this._setButtons();

        this._body.style.transform = `translateX(${this._deltaX}px)`;

        return true;
    }

    private _setButtons() {

        if(this._deltaX > this._max) {
            this._previousButton.classList.remove(this._disabledCssClass)                
        }

        if(this._deltaX < this._min) {
            this._nextButton.classList.remove(this._disabledCssClass)                
        }

        if (this._deltaX <= this._max) {
            this._deltaX = this._max;   
            
            if(!this._nextButton.classList.contains(this._disabledCssClass))
                this._nextButton.classList.add(this._disabledCssClass)
        }

        if(this._deltaX  >= this._min) {
            this._deltaX = this._min;    
            
            if(!this._previousButton.classList.contains(this._disabledCssClass))
                this._previousButton.classList.add(this._disabledCssClass)            
        }        
    }

    static mount(element:HTMLElement) {
        var elements = element.querySelectorAll(".strip") as NodeListOf<HTMLElement>;

        for(var i = 0; i < elements.length; i++) {
            new Strip(elements[i]);
        }
    }

    private _deltaX = 0;
    private _element: HTMLElement;
    private _hammerManager: HammerManager;
    private get _body(): HTMLElement { return this._element.querySelector("ul"); };
    private get _nextButton(): HTMLElement { return this._element.querySelector(".strip--next") as HTMLElement; }
    private get _previousButton(): HTMLElement { return this._element.querySelector(".strip--previous") as HTMLElement; }
    private get _max():number { return this._element.offsetWidth - this._body.offsetWidth; }
    private get _min() { return 0; }
    private _disabledCssClass = "strip--button-disabled";
}

document.addEventListener("readystatechange",() => {
    if(document.readyState == "complete")
        Strip.mount(document.querySelector("body"));    
})