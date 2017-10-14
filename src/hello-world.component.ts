import { render, html } from "lit-html";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "hello-world-title"
        ];
    }

    async connectedCallback() {    
        this.attachShadow({ mode: 'open' });
        
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'helloworld');

        this.title$.subscribe(x => this._render());

        this._render();
        this._setEventListeners();       
    }

    private _render() {
        render(html`
            <style>

            </style>

            <h1>${this.title$.value} via lit-html</h1>`, this.shadowRoot);
    }
    
    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "hello-world-title":
                this.title$.next(newValue);
                break;
        }
    }

    public title$: BehaviorSubject<string> = new BehaviorSubject("");
}

customElements.define(`ce-hello-world`, HelloWorldComponent);
