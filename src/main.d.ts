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
    constructor(element: HTMLElement);
    private _registerEventListeners;
    private _handleMouseDown;
    private _handleMouseUp;
    private _handleTouchStart;
    private _handleTouchMove;
    private _handleTouchEnd;
    static mount(element?: HTMLElement): void;
    private _touchStart;
    private _touchMove;
    private _element;
    private get _body();
    private _numberOfItems;
}
