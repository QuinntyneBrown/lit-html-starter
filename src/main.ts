import { html, render, TemplateResult } from "lit-html";


export class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        render(html``, this.shadowRoot);
    }
}


customElements.define("hello-world", HelloWorldComponent);