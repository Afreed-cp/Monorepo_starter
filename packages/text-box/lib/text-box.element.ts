import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';

@customElement('text-box')
export class ThemeEngineTextBoxElement extends LitElement {
  private readonly inputId: string;

  constructor() {
    super();
    // Generate ID once during construction
    this.inputId = `input-${nanoid(9)}`;
  }

  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) error = '';
  @property({ type: String }) helperText = '';
  @property({ type: String }) name = '';

  static styles = css`
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

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('fbui-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('fbui-change', {
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
            ${this.label}${this.required ? '*' : ''}
          </label>
        ` : ''}
        
        <input
          id="${inputName}"
          .value="${this.value}"
          type="${this.type}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          name="${inputName}"
          class="${this.error ? 'error' : ''}"
          @input="${this.handleInput}"
          @change="${this.handleChange}"
        />
        
        ${this.error ? html`
          <div class="error-message" role="alert">${this.error}</div>
        ` : ''}
        
        ${this.helperText ? html`
          <div class="helper-text">${this.helperText}</div>
        ` : ''}
      </div>
    `;
  }
}
