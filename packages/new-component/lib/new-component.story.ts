import type { Meta, StoryObj } from '@storybook/web-components';

import './new-component.element';
import type { ThemeEngineNewComponentElement } from './new-component.element';
import readme from '../README.md';

const meta: Meta<ThemeEngineNewComponentElement> = {
  id: 'new-component',
  title: 'New Component',
  component: 'new-component',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<new-component></new-component>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ThemeEngineNewComponentElement>;

export const Overview: Story = {};
