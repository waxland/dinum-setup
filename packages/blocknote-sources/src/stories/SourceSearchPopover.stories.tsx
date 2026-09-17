import type { Meta, StoryObj } from '@storybook/react';
import { SourceSearchPopover } from '../components/SourceSearchPopover';

const meta: Meta<typeof SourceSearchPopover> = {
  title: 'BlockNote Sources/Components/SourceSearchPopover',
  component: SourceSearchPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SourceSearchPopover>;

export const DefaultLawSearch: Story = {
  args: {
    initialType: 'law',
    onSelect: (entity) => console.log('Selected entity:', entity),
    onCancel: () => console.log('Search cancelled'),
  },
};

export const CompanySearch: Story = {
  args: {
    initialType: 'company',
    onSelect: (entity) => console.log('Selected entity:', entity),
    onCancel: () => console.log('Search cancelled'),
  },
};

export const ProcurementSearch: Story = {
  args: {
    initialType: 'procurement',
    onSelect: (entity) => console.log('Selected entity:', entity),
    onCancel: () => console.log('Search cancelled'),
  },
};
