import { html, fixture, expect } from '@open-wc/testing';
import { ThemeEngineTestingPackageElement } from './testing-package.element';

describe('ThemeEngineTestingPackageElement', () => {
  let element: ThemeEngineTestingPackageElement;

  beforeEach(async () => {
    element = await fixture(
      html` <testing-package></testing-package> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(ThemeEngineTestingPackageElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});