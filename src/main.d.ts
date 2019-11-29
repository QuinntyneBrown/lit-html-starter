declare class RibbonEvents {
    static readonly reset = "RESET";
    static readonly translate = "TRANSLATE";
}
declare class CustomEventDispatcher {
    static dispatch(element: HTMLElement, type: string, payload?: any): void;
}
declare class Ribbon {
    constructor(element: HTMLElement, $document: Document, $window: Window);
    private _registerEventListeners;
    private _handleTranslate;
    private _handlePanMove;
    private _handleReset;
    private _handleResize;
    static mount(element: HTMLElement): void;
    private _deltaX;
    private _element;
    private _hammerManager;
    private get _body();
    private _document;
    private _window;
}
