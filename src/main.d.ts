declare class RibbonController {
    constructor();
    static get instance(): RibbonController;
    private static _instance;
    translate: (options: {
        element: HTMLElement;
        deltaX: number;
    }) => boolean;
    private _style;
    private _deltaX;
}
declare class Ribbon {
    constructor(element?: HTMLElement);
    private _registerEventListeners;
    private _handleSwipe;
    static mount(element: HTMLElement): void;
    private _element;
    private _hammerManager;
}
