declare class RibbonEvents {
    static readonly reset = "RESET";
    static readonly translate = "TRANSLATE";
}
declare class CustomEventDispatcher {
    static dispatch(element: HTMLElement, type: string, payload?: any): void;
}
declare class RibbonTranslateCoordiantor {
    constructor(element: HTMLElement);
    static initializeIfNull(element: HTMLElement): void;
    private static _instance;
    handleTranslate: (e: CustomEvent<any>) => boolean;
    _element: HTMLElement;
    _deltaX: number;
    private get _body();
}
declare class Ribbon {
    constructor(element?: HTMLElement);
    private _registerEventListeners;
    private _handleSwipe;
    static mount(element: HTMLElement): void;
    private _element;
    private _hammerManager;
}
