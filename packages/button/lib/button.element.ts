import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('button-ui')
export class ThemeEngineButtonElement extends LitElement {
  static styles = css`
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

  @property({ type: String })
  variant: 'primary' | 'secondary' = 'primary';

  @property({ type: Boolean })
  disabled = false;

  render() {
    return html`
    <h1>test</h1>
      <button
        class=${`btn ${this.variant}`}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('theme-engine-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'button-ui': ThemeEngineButtonElement;
  }
}
