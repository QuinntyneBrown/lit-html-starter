declare class RibbonTranslateCoordiantor {
    static get instance(): RibbonTranslateCoordiantor;
    private static _instance;
    translate: (options: {
        element: HTMLElement;
        deltaX: number;
    }) => boolean;
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
