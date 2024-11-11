import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('new-component')
export class ThemeEngineNewComponentElement extends LitElement {
  static styles = css`
    /* Styles here */
  `;

  @property({ type: String }) label = '';

  render() {
    return html`<div>${this.label}</div>`;
  }
}
