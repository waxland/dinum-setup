import type { Meta, StoryObj } from '@storybook/react';
import { SourceCalloutFormat } from '../formats/SourceCalloutFormat';
import { SourceEntityProps } from '../types';

const meta: Meta<typeof SourceCalloutFormat> = {
  title: 'BlockNote Sources/Formats/SourceCalloutFormat',
  component: SourceCalloutFormat,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SourceCalloutFormat>;

const sampleLawProps: SourceEntityProps = {
  sourceId: 'LEGIARTI000038814944',
  entityType: 'law',
  title: 'Article L. 111-1 du Code de la commande publique',
  subtitle: 'Code de la commande publique - Titre Ier',
  url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038814944',
  status: 'En vigueur',
  badgeText: 'En vigueur',
  badgeVariant: 'success',
  excerpt:
    'Les acheteurs et les autorités concédantes choisissent librement, pour répondre à leurs besoins, de recourir à un contrat de la commande publique.',
  metadata: {
    code: 'Code de la commande publique',
    nature: 'Article législatif',
    date_effet: '2026-01-01',
  },
};

export const LawCallout: Story = {
  args: {
    props: sampleLawProps,
  },
};

export const GrantCallout: Story = {
  args: {
    props: {
      sourceId: 'GRANT-2026-042',
      entityType: 'grant',
      title: 'Fonds Vert 2026 - Rénovation Énergétique des Bâtiments Scolaires',
      subtitle: 'Agence Nationale de la Cohésion des Territoires (ANCT)',
      url: 'https://aides-territoires.beta.gouv.fr/aides/fonds-vert',
      status: 'Candidatures ouvertes',
      badgeText: 'Taux max : 80%',
      badgeVariant: 'info',
      excerpt:
        'Soutien financier pour la transition écologique des collectivités territoriales. Dépôt des dossiers ouvert jusqu’au 30 novembre 2026.',
    },
  },
};
