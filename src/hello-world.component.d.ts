import { BehaviorSubject } from "rxjs/BehaviorSubject";
export declare class HelloWorldComponent extends HTMLElement {
    constructor();
    static readonly observedAttributes: string[];
    connectedCallback(): Promise<void>;
    private _render();
    private _setEventListeners();
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    title$: BehaviorSubject<string>;
    onClick(): void;
}
