import { html, fixture, expect } from '@open-wc/testing';
import { ThemeEngineNewComponentElement } from './new-component.element';

describe('ThemeEngineNewComponentElement', () => {
  let element: ThemeEngineNewComponentElement;

  beforeEach(async () => {
    element = await fixture(
      html` <new-component></new-component> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(ThemeEngineNewComponentElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});