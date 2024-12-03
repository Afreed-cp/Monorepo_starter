import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import crypto from 'crypto';

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
let fillPool = bytes => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.randomFillSync(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.randomFillSync(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
};
let nanoid = (size = 21) => {
  fillPool((size -= 0));
  let id = '';
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id
};

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
let ThemeEngineTextBoxElement = class extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.label = "";
    this.placeholder = "";
    this.type = "text";
    this.disabled = false;
    this.required = false;
    this.error = "";
    this.helperText = "";
    this.name = "";
    this.inputId = `input-${nanoid(9)}`;
  }
  handleInput(e) {
    const input = e.target;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent("fbui-input", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
  handleChange(e) {
    const input = e.target;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent("fbui-change", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
  render() {
    const inputName = this.name || this.inputId;
    return html`
      <div class="input-container">
        ${this.label ? html`
          <label for="${inputName}">
            ${this.label}${this.required ? "*" : ""}
          </label>
        ` : ""}
        
        <input
          id="${inputName}"
          .value="${this.value}"
          type="${this.type}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          name="${inputName}"
          class="${this.error ? "error" : ""}"
          @input="${this.handleInput}"
          @change="${this.handleChange}"
        />
        
        ${this.error ? html`
          <div class="error-message" role="alert">${this.error}</div>
        ` : ""}
        
        ${this.helperText ? html`
          <div class="helper-text">${this.helperText}</div>
        ` : ""}
      </div>
    `;
  }
};
ThemeEngineTextBoxElement.styles = css`
    :host {
      display: block;
    }

    .input-container {
      position: relative;
      width: 100%;
    }

    label {
      display: block;
      margin-bottom: 4px;
      font-size: 14px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    input.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    .helper-text {
      color: #666;
      font-size: 12px;
      margin-top: 4px;
    }

    input:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  `;
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "value", 2);
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "label", 2);
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "placeholder", 2);
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "type", 2);
__decorateClass([
  property({ type: Boolean })
], ThemeEngineTextBoxElement.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean })
], ThemeEngineTextBoxElement.prototype, "required", 2);
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "error", 2);
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "helperText", 2);
__decorateClass([
  property({ type: String })
], ThemeEngineTextBoxElement.prototype, "name", 2);
ThemeEngineTextBoxElement = __decorateClass([
  customElement("text-box")
], ThemeEngineTextBoxElement);

export { ThemeEngineTextBoxElement };
