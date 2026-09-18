import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { demoSearchClient } from '../demoSearchClient';
import { SourceSearchPopover } from '../components/SourceSearchPopover';

const meta: Meta<typeof SourceSearchPopover> = {
  title: 'BlockNote Sources/Components/SourceSearchPopover',
  component: SourceSearchPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { client: demoSearchClient, onSelect: fn(), onCancel: fn() },
};

export default meta;
type Story = StoryObj<typeof SourceSearchPopover>;

export const DefaultLawSearch: Story = {
  args: {
    initialType: 'law',
  },
};

export const CompanySearch: Story = {
  args: {
    initialType: 'company',
  },
};

export const ProcurementSearch: Story = {
  args: {
    initialType: 'procurement',
  },
};
