import type { Meta, StoryObj } from '@storybook/web-components';

import './testing-package.element';
import type { ThemeEngineTestingPackageElement } from './testing-package.element';
import readme from '../README.md';

const meta: Meta<ThemeEngineTestingPackageElement> = {
  id: 'testing-package',
  title: 'Testing Package',
  component: 'testing-package',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<testing-package></testing-package>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ThemeEngineTestingPackageElement>;

export const Overview: Story = {};
