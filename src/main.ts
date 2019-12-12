class Slider {

    constructor(element: HTMLElement) {
        this._element = element;
        this._setButtons();
        this._registerEventListeners();        
    }

    private _registerEventListeners() {
        this._nextButton.addEventListener("click",() => {
            alert("?")
        });
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
        var elements = element.querySelectorAll(".slider") as NodeListOf<HTMLElement>;

        for(var i = 0; i < elements.length; i++) {
            new Slider(elements[i]);
        }
    }

    private _deltaX = 0;
    private _element: HTMLElement;

    private get _body(): HTMLElement { return this._element.querySelector(".slider__body"); };
    private get _nextButton(): HTMLElement { return this._element.querySelector(".slider--next") as HTMLElement; }
    private get _previousButton(): HTMLElement { return this._element.querySelector(".slider--previous") as HTMLElement; }
    private get _max():number { return this._element.offsetWidth - this._body.offsetWidth; }
    private get _min() { return 0; }
    private _disabledCssClass = "slider--button-disabled";
}

document.addEventListener("readystatechange",() => {
    if(document.readyState == "complete")
        Slider.mount(document.querySelector("body"));    
})