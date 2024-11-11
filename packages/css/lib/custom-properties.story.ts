import { html, svg } from 'lit-html';
import readme from '../README.md';

// @ts-ignore-start
import customProperties from '../custom-properties.module.js';
// @ts-ignore-end
const properties = Object.keys(customProperties.customProperties).map(
  // @ts-ignore
  key => ({ key: key, value: customProperties.customProperties[key] }),
);

const copyIcon = svg`<svg style="pointer-events: none" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon m-2">
<path fill="currentColor" fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>`;

export default {
  title: 'Design/Custom properties',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const copyToClipboard = (e: Event) => {
  const button = e.target as any;
  const text = button.dataset.copyToClipboard;
  if (text) {
    navigator.clipboard.writeText(text);
    button.state = 'success';
  }
};

const propertyColorTemplate = (property: any) =>
  html` <tr>
    <td>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        ${property.key}
        <button
          data-copy-to-clipboard=${property.key}
          title="Copy custom property to clipboard"
          aria-label="Copy custom property to clipboard"
          style="background: none; border: none; cursor: pointer;">
          ${copyIcon}
        </button>
      </div>
    </td>
    <td>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <code>${property.value}</code>
        <button
          data-copy-to-clipboard=${property.value}
          title="Copy color value to clipboard"
          aria-label="Copy color value to clipboard"
          style="background: none; border: none; cursor: pointer;">
          ${copyIcon}
        </button>
      </div>
    </td>
    <td>
      <div style="background: var(${property.key}); width: 60px; height: 60px;"></div>
    </td>
  </tr>`;

export const InterfaceColors = () => {
  const base = [
    '--uui-color-surface',
    '--uui-color-background',
    '--uui-color-text',
    '--uui-color-color-border',
    '--uui-color-divider',
    '--uui-color-interactive',
  ];
  const state = [
    '--uui-color-selected',
    '--uui-color-current',
    '--uui-color-disabled',
    '--uui-color-focus',
  ];
  const color = [
    '--uui-color-default',
    '--uui-color-positive',
    '--uui-color-warning',
    '--uui-color-danger',
    '--uui-color-disabled',
  ];
  const universal = ['--uui-color-header'];

  return html`
    <article style="max-width:580px;">
      <h1>Interface Colors</h1>
      <p class="uui-lead">
        Interface styling should use the following properties to ensure contrasts and appearance follow the current theme.
      </p>
      <p>
        Here's a description and examples of how to use the interface colors.
      </p>

      <h4>Text and interactables</h4>
      <ul>
        <li><b>Text</b> - Use it for text, icons or other elements that need to standout from the base of the element</li>
        <li><b>Interactable</b> - Used when the text or icon is interactable, such as a link</li>
      </ul>

      <h4>States</h4>
      <ul>
        <li><b>Selected</b> - Use to highlight text or background when a component is in the 'selected' state.</li>
        <li><b>Current</b> - Use to highlight text or background when a component is in the 'current' state, only used by navigation items to indicate the current location.</li>
        <li><b>Disabled</b> - Use for displaying disabled state.</li>
      </ul>

      <h4>Borders and dividers</h4>
      <ul>
        <li><b>Border</b> - Use for component borders</li>
        <li><b>Divider</b> - Used for thin borders that provide a visual separation. Example: a list of items</li>
      </ul>

      <h4>Misc</h4>
      <ul>
        <li><b>Surface</b> - The general background color for elements</li>
        <li><b>Background</b> - The general background color of the app</li>
        <li><b>Header</b> - Background color of the header of the app</li>
        <li><b>Focus</b> - Color for the focus outline on inputs, buttons, links, and so on</li>
      </ul>

      <h4>Color variants</h4>
      <p>
        Each color can come in additional variants. What below is referred to as the default variant, meaning no variant-name is prepended to the variable-name:
      </p>
      <ul>
        <li><b>Contrast</b> - This color will stand out and be readable with the default variant as its background. Mostly used for text and icons.</li>
        <li><b>Standalone</b> - This color will have a higher contrast to the background than its default variant. Example: if the background is light, the standalone variant will be a darker variant of the default variant.</li>
        <li><b>Emphasis</b> - Used when you want to emphasize an element, make it stand out. Mostly used for hover and focus states.</li>
      </ul>
    </article>

    <h3>Base</h3>
    <table>
      <thead>
        <tr>
          <th>Custom property name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${properties
          .filter(property => base.some(x => property.key.includes(x)))
          .map(property => propertyColorTemplate(property))}
      </tbody>
    </table>

    <h3>State</h3>
    <table>
      <thead>
        <tr>
          <th>Custom property name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${properties
          .filter(property => state.some(x => property.key.includes(x)))
          .map(property => propertyColorTemplate(property))}
      </tbody>
    </table>

    <h3>Color</h3>
    <table>
      <thead>
        <tr>
          <th>Custom property name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${properties
          .filter(property => color.some(x => property.key.includes(x)))
          .map(property => propertyColorTemplate(property))}
      </tbody>
    </table>

    <h3>Universal</h3>
    <table>
      <thead>
        <tr>
          <th>Custom property name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${properties
          .filter(property => universal.some(x => property.key.includes(x)))
          .map(property => propertyColorTemplate(property))}
      </tbody>
    </table>
  `;
};
