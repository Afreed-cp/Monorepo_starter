import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let ThemeEngineNewComponentElement = class extends LitElement {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  render() {
    return html`<div>${this.label}</div>`;
  }
};
ThemeEngineNewComponentElement.styles = css`
    /* Styles here */
  `;
__decorateClass([
  property({ type: String })
], ThemeEngineNewComponentElement.prototype, "label", 2);
ThemeEngineNewComponentElement = __decorateClass([
  customElement("new-component")
], ThemeEngineNewComponentElement);

export { ThemeEngineNewComponentElement };
