import { render, html } from "lit-html";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
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
        
        this._setEventListeners();       
    }

    private _render() {
        render(html`        
            <style>
                :host {
                    background-color: #fff;
                    cursor:pointer;
                    line-height: 3em;
                    display: inline-block;
                    padding: 0px 20px 0px 20px;
                    margin: 20px 20px 20px 20px;
                }
            </style>
            <slot></slot>`, this.shadowRoot);
    }
    
    private _setEventListeners() {
        this.shadowRoot.addEventListener("click", this.onClick);
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener("click", this.onClick);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "hello-world-title":
                this.title$.next(newValue);
                break;
        }
    }

    public title$: BehaviorSubject<string> = new BehaviorSubject("");

    public onClick(): void {
        alert(this.title$.value);
    }
}

customElements.define(`ce-hello-world`, HelloWorldComponent);
