export declare class HelloWorldComponent extends HTMLElement {
    constructor();
    static readonly observedAttributes: any[];
    connectedCallback(): Promise<void>;
    private _render();
    private _setEventListeners();
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
}
