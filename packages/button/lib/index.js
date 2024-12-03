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
let ThemeEngineButtonElement = class extends LitElement {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.disabled = false;
  }
  render() {
    return html`
      <button
        class=${`btn ${this.variant}`}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
  _handleClick(e) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent("theme-engine-click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      }));
    }
  }
};
ThemeEngineButtonElement.styles = css`
    .btn {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-family: sans-serif;
    }

    .primary {
      background: #0077ff;
      color: white;
    }

    .secondary {
      background: #e0e0e0;
      color: #333;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
__decorateClass([
  property({ type: String })
], ThemeEngineButtonElement.prototype, "variant", 2);
__decorateClass([
  property({ type: Boolean })
], ThemeEngineButtonElement.prototype, "disabled", 2);
ThemeEngineButtonElement = __decorateClass([
  customElement("button-ui")
], ThemeEngineButtonElement);

export { ThemeEngineButtonElement };
