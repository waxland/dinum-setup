import type { Meta, StoryObj } from '@storybook/react';
import { SourceCardFormat } from '../formats/SourceCardFormat';
import { SourceEntityProps } from '../types';

const meta: Meta<typeof SourceCardFormat> = {
  title: 'BlockNote Sources/Formats/SourceCardFormat',
  component: SourceCardFormat,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SourceCardFormat>;

const sampleCompanyProps: SourceEntityProps = {
  sourceId: '13002526500013',
  entityType: 'company',
  title: 'Direction Interministérielle du Numérique (DINUM)',
  subtitle: 'SIREN : 130 025 265 • SIRET : 130 025 265 00013',
  url: 'https://annuaire-entreprises.data.gouv.fr/entreprise/130025265',
  status: 'Actif',
  badgeText: 'Administration Centrale',
  badgeVariant: 'success',
  excerpt:
    'Service de la Première ministre chargé de la transformation numérique de l’État et du développement des communs numériques.',
  metadata: {
    siren: '130025265',
    categorie: 'Service de l’État',
    adresse: '20 avenue de Ségur, 75007 Paris',
  },
};

export const CompanyCard: Story = {
  args: {
    props: sampleCompanyProps,
  },
};

export const ProcurementCard: Story = {
  args: {
    props: {
      sourceId: '26-104892',
      entityType: 'procurement',
      title: 'Avis BOAMP 26-104892 - Prestations Cloud et DevOps Souverains',
      subtitle: 'Direction des Achats de l’État (DAE) • Procédure Ouverte',
      url: 'https://www.marches-publics.gouv.fr/?ref=104892',
      status: 'En cours',
      badgeText: 'Date limite : 15 oct. 2026',
      badgeVariant: 'warning',
      excerpt:
        'Accord-cadre interministériel pour l’accompagnement au déploiement des infrastructures d’hébergement SecNumCloud.',
      metadata: {
        cpv: '72000000-5',
        acheteur: 'DINUM',
      },
    },
  },
};
