declare class Strip {
    constructor(element: HTMLElement);
    private _handlePanMove;
    private _setButtons;
    static mount(element: HTMLElement): void;
    private _deltaX;
    private _element;
    private _hammerManager;
    private get _body();
    private get _nextButton();
    private get _previousButton();
    private get _max();
    private get _min();
    private _disabledCssClass;
}
