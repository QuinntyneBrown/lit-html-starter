import { render, html } from "lit-html";

export class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [];
    }

    async connectedCallback() {    
        this.attachShadow({ mode: 'open' });
        
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'helloworld');

        this._render();
        this._setEventListeners();
    }

    private _render() {
        render(html`
            <style>

            </style>

            <h1>Hello World via lit-html</h1>`, this.shadowRoot);
    }
    
    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }
}

customElements.define(`ce-hello-world`, HelloWorldComponent);
