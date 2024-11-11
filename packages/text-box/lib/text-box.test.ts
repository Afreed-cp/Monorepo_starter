import { fixture, html, oneEvent,expect } from '@open-wc/testing';
import './text-box.element';
import type { ThemeEngineTextBoxElement } from './text-box.element';

describe('FbuiTextbox', () => {
  it('renders with default properties', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`<text-box></text-box>`);
    
    // Check default properties
    expect(el.value).to.equal('');
    expect(el.label).to.equal('');
    expect(el.placeholder).to.equal('');
    expect(el.type).to.equal('text');
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
    expect(el.error).to.equal('');
    expect(el.helperText).to.equal('');
    expect(el.name).to.equal('');
  });

  it('renders with custom properties', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`
      <text-box
        label="Test Label"
        value="Test Value"
        placeholder="Test Placeholder"
        type="email"
        helperText="Test Helper"
        name="test-input"
        required
      ></text-box>
    `);

    const input = el.shadowRoot!.querySelector('input');
    const label = el.shadowRoot!.querySelector('label');
    const helperText = el.shadowRoot!.querySelector('.helper-text');

    expect(input?.value).to.equal('Test Value');
    expect(input?.type).to.equal('email');
    expect(input?.placeholder).to.equal('Test Placeholder');
    expect(input?.required).to.be.true;
    expect(input?.name).to.equal('test-input');
    expect(label?.textContent?.trim()).to.equal('Test Label*');
    expect(helperText?.textContent).to.equal('Test Helper');
  });

  it('shows error message when error prop is set', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`
      <text-box
        label="Test"
        error="Invalid input"
      ></text-box>
    `);

    const errorMessage = el.shadowRoot!.querySelector('.error-message');
    const input = el.shadowRoot!.querySelector('input');

    expect(errorMessage?.textContent).to.equal('Invalid input');
    expect(input?.classList.contains('error')).to.be.true;
  });

  it('disables input when disabled prop is set', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`
      <text-box disabled></text-box>
    `);

    const input = el.shadowRoot!.querySelector('input');
    expect(input?.disabled).to.be.true;
  });

  it('emits fbui-input event on input', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`<text-box></text-box>`);
    const input = el.shadowRoot!.querySelector('input')!;

    // Setup listener for custom event
    setTimeout(() => {
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));
    });

    const { detail } = await oneEvent(el, 'fbui-input');
    expect(detail.value).to.equal('new value');
  });

  it('emits fbui-change event on change', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`<text-box></text-box>`);
    const input = el.shadowRoot!.querySelector('input')!;

    // Setup listener for custom event
    setTimeout(() => {
      input.value = 'changed value';
      input.dispatchEvent(new Event('change'));
    });

    const { detail } = await oneEvent(el, 'fbui-change');
    expect(detail.value).to.equal('changed value');
  });

  it('generates unique IDs for multiple instances', async () => {
    const el1 = await fixture<ThemeEngineTextBoxElement>(html`<text-box label="First"></text-box>`);
    const el2 = await fixture<ThemeEngineTextBoxElement>(html`<text-box label="Second"></text-box>`);

    const input1 = el1.shadowRoot!.querySelector('input');
    const input2 = el2.shadowRoot!.querySelector('input');
    const label1 = el1.shadowRoot!.querySelector('label');
    const label2 = el2.shadowRoot!.querySelector('label');

    // Check that IDs are unique and labels are properly associated
    expect(input1?.id).to.not.equal(input2?.id);
    expect(input1?.id).to.equal(label1?.getAttribute('for'));
    expect(input2?.id).to.equal(label2?.getAttribute('for'));
  });

  it('uses name attribute as id when provided', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`
      <text-box label="Test" name="test-name"></text-box>
    `);

    const input = el.shadowRoot!.querySelector('input');
    const label = el.shadowRoot!.querySelector('label');

    expect(input?.id).to.include('test-name');
    expect(label?.getAttribute('for')).to.include('test-name');
  });

  it('handles different input types correctly', async () => {
    const types = ['text', 'password', 'email', 'number'] as const;
    
    for (const type of types) {
      const el = await fixture<ThemeEngineTextBoxElement>(html`
        <text-box type=${type}></text-box>
      `);
      
      const input = el.shadowRoot!.querySelector('input');
      expect(input?.type).to.equal(type);
    }
  });

  it('updates value property when input changes', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`<text-box></text-box>`);
    const input = el.shadowRoot!.querySelector('input')!;

    input.value = 'updated value';
    input.dispatchEvent(new Event('input'));

    expect(el.value).to.equal('updated value');
  });

  // Accessibility tests
  it('is accessible when all content is provided', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`
      <text-box
        label="Accessible Input"
        helperText="Helper text for screen readers"
        required
      ></text-box>
    `);

    // Check for proper label association
    const input = el.shadowRoot!.querySelector('input');
    const label = el.shadowRoot!.querySelector('label');
    expect(input?.id).to.equal(label?.getAttribute('for'));

    // Check that required state is properly indicated
    expect(label?.textContent).to.include('*');
    expect(input?.required).to.be.true;
  });

  it('is accessible when showing error states', async () => {
    const el = await fixture<ThemeEngineTextBoxElement>(html`
      <text-box
        label="Error Input"
        error="This field has an error"
      ></text-box>
    `);

    const errorMessage = el.shadowRoot!.querySelector('.error-message');
    expect(errorMessage).to.exist;
    expect(errorMessage?.textContent).to.equal('This field has an error');
  });
});