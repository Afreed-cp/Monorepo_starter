import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './text-box.element';
import type { ThemeEngineTextBoxElement } from './text-box.element';

const meta = {
  title: 'Components/Textbox',
  component: 'text-box',
  tags: ['autodocs'],
  render: (args) => html`
    <text-box
      .label=${args.label}
      .value=${args.value}
      .placeholder=${args.placeholder}
      .type=${args.type}
      .error=${args.error}
      .helperText=${args.helperText}
      .name=${args.name}
      ?disabled=${args.disabled}
      ?required=${args.required}
      @fbui-input=${(e: CustomEvent) => console.log('Input:', e.detail.value)}
      @fbui-change=${(e: CustomEvent) => console.log('Change:', e.detail.value)}
    ></text-box>
  `,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number']
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    name: { control: 'text' }
  }
} satisfies Meta<ThemeEngineTextBoxElement>;

export default meta;

type Story = StoryObj<ThemeEngineTextBoxElement>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This will be your display name'
  }
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    type: 'email',
    required: true
  }
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    value: '123',
    required: true,
    error: 'Password must be at least 8 characters'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Readonly Field',
    value: 'This field is disabled',
    disabled: true
  }
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    helperText: 'Maximum 200 characters'
  }
};