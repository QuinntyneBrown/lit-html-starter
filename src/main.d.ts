declare class RibbonController {
    constructor();
    static get instance(): RibbonController;
    private static _instance;
    translate: (options: {
        element: HTMLElement;
        deltaX: number;
    }) => void;
    private _style;
    private _deltaX;
}
declare class Ribbon {
    constructor(element?: HTMLElement);
    private _registerEventListeners;
    private _registerTouchEventListeners;
    private _handleMouseDown;
    private _handleMouseUp;
    private _handleTouchStart;
    private _handleTouchMove;
    private _handleTouchEnd;
    private _handleSwipe;
    static mount(element?: HTMLElement): void;
    private _touchStart;
    private _touchMove;
    private _element;
    private _hammerManager;
    private get _body();
    private get _numberOfItems();
}
