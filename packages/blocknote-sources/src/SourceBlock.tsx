import {
    BlockNoDefaults,
    BlockNoteEditor,
    InlineContentSchema,
    StyleSchema,
    defaultProps,
} from '@blocknote/core';
import { insertOrUpdateBlockForSlashMenu } from '@blocknote/core/extensions';
import { createReactBlockSpec } from '@blocknote/react';
import React from 'react';

import { SourceSearchPopover } from './components/SourceSearchPopover';
import {
    SourceBlockToolbar,
    SourceCalloutFormat,
    SourceCardFormat,
    SourceLinkFormat,
} from './formats';
import {
    CreateSourceBlockConfig,
    DISPLAY_MODES,
    DisplayMode,
    SOURCE_ENTITY_TYPES,
    STATUS_COLORS,
    SourceBlockEditor,
    SourceEntityProps,
    SourceEntityType,
    TranslationFn,
} from './types';

interface SourceComponentProps {
  block: BlockNoDefaults<
    Record<'sourceBlock', CreateSourceBlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
  editor: BlockNoteEditor<
    Record<'sourceBlock', CreateSourceBlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
}

const getSourceTypeLabel = (type: SourceEntityType): string => {
  switch (type) {
    case 'law':
      return 'Légifrance / DILA';
    case 'company':
      return 'Annuaire des Entreprises / RNE';
    case 'parliament':
      return 'Assemblée Nationale';
    case 'address':
      return 'Base Adresse Nationale (BAN)';
    case 'procurement':
      return 'Marchés Publics / BOAMP';
    case 'grant':
      return 'Aides-Territoires / Subventions';
    case 'insee':
      return 'Données Locales INSEE';
    case 'agent':
      return 'Annuaire du Service Public';
    case 'cadastre':
      return 'Cadastre & Parcelles DGFiP';
    case 'demarche':
      return 'Démarches-Simplifiées';
    case 'opendata':
      return 'data.gouv.fr / Open Data';
    case 'custom':
      return 'Albert IA Souveraine';
    default:
      return 'Source Souveraine';
  }
};

const SourceComponent: React.FC<SourceComponentProps> = ({ block, editor }) => {
  const isEditable = editor.isEditable;
  const props: SourceEntityProps = {
    entityType: block.props.entityType,
    displayMode: block.props.displayMode,
    sourceId: block.props.sourceId,
    title: block.props.title,
    subtitle: block.props.subtitle,
    status: block.props.status,
    statusColor: block.props.statusColor,
    meta1: block.props.meta1,
    meta2: block.props.meta2,
    meta3: block.props.meta3,
    excerpt: block.props.excerpt,
    summary: block.props.summary,
    url: block.props.url,
    verifiedAt: block.props.verifiedAt,
    rawPayload: block.props.rawPayload,
  };
  const hasSelectedEntity = Boolean(props.sourceId && props.title);

  const handleSelectEntity = (entity: SourceEntityProps) => {
    if (!isEditable) return;
    editor.updateBlock(block, {
      props: {
        entityType: entity.entityType,
        displayMode: entity.displayMode,
        sourceId: entity.sourceId,
        title: entity.title,
        subtitle: entity.subtitle || '',
        status: entity.status || '',
        statusColor: entity.statusColor || 'blue',
        meta1: entity.meta1 || '',
        meta2: entity.meta2 || '',
        meta3: entity.meta3 || '',
        excerpt: entity.excerpt || '',
        summary: entity.summary || '',
        url: entity.url || '',
        verifiedAt: entity.verifiedAt || '',
        rawPayload: entity.rawPayload || '',
      },
    });
  };

  const handleCancelSearch = () => {
    if (!isEditable) return;
    editor.removeBlocks([block]);
  };

  const handleModeChange = (mode: DisplayMode) => {
    if (!isEditable) return;
    editor.updateBlock(block, {
      props: {
        displayMode: mode,
      },
    });
  };

  if (!hasSelectedEntity) {
    return (
      <div style={{ margin: '8px 0', width: '100%' }}>
        <SourceSearchPopover
          initialType={props.entityType || 'law'}
          onSelect={handleSelectEntity}
          onCancel={handleCancelSearch}
        />
      </div>
    );
  }

  const renderFormat = () => {
    switch (props.displayMode) {
      case 'card':
        return <SourceCardFormat props={props} />;
      case 'link':
        return <SourceLinkFormat props={props} />;
      case 'callout':
      default:
        return <SourceCalloutFormat props={props} />;
    }
  };

  return (
    <div style={{ margin: '8px 0', width: '100%' }}>
      <SourceBlockToolbar
        currentMode={props.displayMode || 'callout'}
        onModeChange={handleModeChange}
        url={props.url}
        sourceTypeLabel={getSourceTypeLabel(props.entityType || 'law')}
      />
      {renderFormat()}
    </div>
  );
};

export const SourceBlock = () =>
  createReactBlockSpec(
    {
      type: 'sourceBlock',
      propSchema: {
        entityType: { default: 'law', values: SOURCE_ENTITY_TYPES },
        displayMode: { default: 'callout', values: DISPLAY_MODES },
        sourceId: { default: '' },
        title: { default: '' },
        subtitle: { default: '' },
        status: { default: '' },
        statusColor: { default: 'blue', values: STATUS_COLORS },
        meta1: { default: '' },
        meta2: { default: '' },
        meta3: { default: '' },
        excerpt: { default: '' },
        summary: { default: '' },
        url: { default: '' },
        verifiedAt: { default: '' },
        rawPayload: { default: '' },
        textAlignment: defaultProps.textAlignment,
        backgroundColor: defaultProps.backgroundColor,
      },
      content: 'none',
    },
    {
      render: ({ block, editor }) => (
        <SourceComponent
          block={block}
          editor={editor}
        />
      ),
    },
  );

export const getSourceReactSlashMenuItems = (
  editor: SourceBlockEditor,
  t: TranslationFn,
  group: string,
) => [
  {
    key: 'source_law',
    title: t('Légifrance / Loi'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'law', displayMode: 'callout' },
      });
    },
    aliases: ['loi', 'legifrance', 'article', 'code', 'juridique', 'dila', 'piste'],
    group,
    icon: <span>⚖️</span>,
    subtext: t('Insérer un article de loi certifié Légifrance'),
  },
  {
    key: 'source_company',
    title: t('Entreprise / SIREN'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'company', displayMode: 'card' },
      });
    },
    aliases: ['entreprise', 'siren', 'siret', 'societe', 'rne', 'insee', 'pappers'],
    group,
    icon: <span>🏢</span>,
    subtext: t('Insérer une fiche d’entreprise certifiée RNE / INSEE'),
  },
  {
    key: 'source_parliament',
    title: t('Assemblée Nationale'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'parliament', displayMode: 'callout' },
      });
    },
    aliases: ['assemblee', 'amendement', 'depute', 'parlement', 'loi-an', 'claire'],
    group,
    icon: <span>🏛️</span>,
    subtext: t('Insérer un amendement ou dossier parlementaire'),
  },
  {
    key: 'source_address',
    title: t('Adresse / BAN'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'address', displayMode: 'card' },
      });
    },
    aliases: ['adresse', 'ban', 'geoplateforme', 'insee-adr', 'ign', 'localisation'],
    group,
    icon: <span>📍</span>,
    subtext: t('Insérer une adresse certifiée Base Adresse Nationale'),
  },
  {
    key: 'source_procurement',
    title: t('Marché Public / BOAMP'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'procurement', displayMode: 'card' },
      });
    },
    aliases: ['marche', 'boamp', 'achat', 'dce', 'appel-offres', 'dae'],
    group,
    icon: <span>🛍️</span>,
    subtext: t('Insérer un avis d’appel public à la concurrence (BOAMP)'),
  },
  {
    key: 'source_grant',
    title: t('Subvention / Aides-Territoires'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'grant', displayMode: 'card' },
      });
    },
    aliases: ['subvention', 'aides', 'fonds-vert', 'detr', 'dsil', 'anct'],
    group,
    icon: <span>💶</span>,
    subtext: t('Insérer un dispositif d’aide publique ou Fonds Vert'),
  },
  {
    key: 'source_insee',
    title: t('Statistiques INSEE / Territoire'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'insee', displayMode: 'card' },
      });
    },
    aliases: ['insee', 'stats', 'population', 'territoire', 'demographie'],
    group,
    icon: <span>📊</span>,
    subtext: t('Insérer des indicateurs officiels démographiques INSEE'),
  },
  {
    key: 'source_agent',
    title: t('Annuaire du Service Public'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'agent', displayMode: 'card' },
      });
    },
    aliases: ['agent', 'annuaire', 'service-public', 'contact', 'ministere'],
    group,
    icon: <span>👤</span>,
    subtext: t('Insérer une fiche contact officielle d’un service de l’État'),
  },
  {
    key: 'source_cadastre',
    title: t('Cadastre & Parcelles (DGFiP)'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'cadastre', displayMode: 'card' },
      });
    },
    aliases: ['cadastre', 'parcelle', 'foncier', 'dgfip', 'section'],
    group,
    icon: <span>🗺️</span>,
    subtext: t('Insérer une parcelle cadastrale certifiée DGFiP / IGN'),
  },
  {
    key: 'source_demarche',
    title: t('Démarches-Simplifiées'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'demarche', displayMode: 'card' },
      });
    },
    aliases: ['demarche', 'formulaire', 'usager', 'procedure', 'dossier'],
    group,
    icon: <span>📝</span>,
    subtext: t('Insérer une téléprocédure Démarches-Simplifiées.fr'),
  },
  {
    key: 'source_opendata',
    title: t('data.gouv.fr / Open Data'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'opendata', displayMode: 'card' },
      });
    },
    aliases: ['opendata', 'dataset', 'datagouv', 'donnees', 'etalab'],
    group,
    icon: <span>🌐</span>,
    subtext: t('Insérer un jeu de données certifié de data.gouv.fr'),
  },
  {
    key: 'source_albert',
    title: t('Albert / IA Souveraine'),
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: 'sourceBlock',
        props: { entityType: 'custom', displayMode: 'callout' },
      });
    },
    aliases: ['albert', 'rag', 'ia', 'etalab', 'service-public'],
    group,
    icon: <span>🧠</span>,
    subtext: t('Poser une question administrative à l’IA souveraine Albert'),
  },
];
