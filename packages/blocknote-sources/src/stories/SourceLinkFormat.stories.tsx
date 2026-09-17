import type { Meta, StoryObj } from '@storybook/react';
import { SourceLinkFormat } from '../formats/SourceLinkFormat';

const meta: Meta<typeof SourceLinkFormat> = {
  title: 'BlockNote Sources/Formats/SourceLinkFormat',
  component: SourceLinkFormat,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SourceLinkFormat>;

export const InlineLawLink: Story = {
  args: {
    props: {
      sourceId: 'LEGIARTI000038814944',
      entityType: 'law',
      title: 'Article L. 111-1 (Commande Publique)',
      url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038814944',
      status: 'En vigueur',
      badgeText: 'En vigueur',
      badgeVariant: 'success',
      excerpt: 'Liberté d’accès et choix des contrats de la commande publique.',
    },
  },
};

export const InlineCadastreLink: Story = {
  args: {
    props: {
      sourceId: '75107000AK0042',
      entityType: 'cadastre',
      title: 'Parcelle Section AK n° 0042 (Paris 7e)',
      url: 'https://apicarto.ign.fr/api/cadastre/parcelle',
      status: 'Contenance 1 250 m²',
      badgeText: 'Contenance 1 250 m²',
      badgeVariant: 'neutral',
      excerpt: 'Parcelle cadastrale sise 20 avenue de Ségur, 75007 Paris.',
    },
  },
};
