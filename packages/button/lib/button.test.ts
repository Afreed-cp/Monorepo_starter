import { fixture, html,expect } from '@open-wc/testing';
import './button.element';
import type { ThemeEngineButtonElement } from './button.element';

describe('ThemeEngineButtonElement', () => {
  it('renders with default properties', async () => {
    const el = await fixture<ThemeEngineButtonElement>(html`<button-ui>Click me</button-ui>`);
    expect(el.variant).to.equal('primary');
    expect(el.disabled).to.be.false;
  });

  it('emits click event when clicked', async () => {
    const el = await fixture<ThemeEngineButtonElement>(html`<button-ui>Click me</button-ui>`);
    let clicked = false;
    el.addEventListener('theme-engine-click', () => clicked = true);
    
    // Find and click the actual button element inside the shadow DOM
    const button = el.shadowRoot!.querySelector('button');
    button?.click();
    
    expect(clicked).to.be.true;
  });
});