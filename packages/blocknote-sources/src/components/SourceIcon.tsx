import React from 'react';
import { SourceEntityType } from '../types';

export interface SourceIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

/**
 * ⚖️ Légifrance / LEGI (Législation consolidée)
 */
export const IconLegi: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

/**
 * 📖 Code Juridique Officiel
 */
export const IconCodeLaw: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="M6 14h6" />
    <path d="M18 2v20" />
  </svg>
);

/**
 * 📜 JORF (Journal Officiel de la République Française)
 */
export const IconJorf: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

/**
 * 🤝 KALI (Conventions collectives)
 */
export const IconKali: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

/**
 * 🛡️ CNIL / Protection des données
 */
export const IconCnil: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11" r="2" />
    <path d="M12 13v3" />
  </svg>
);

/**
 * 📄 Circulaire & Instructions ministérielles
 */
export const IconCirc: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

/**
 * 🏢 Entreprise & RNE (Registre National des Entreprises)
 */
export const IconCompany: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

/**
 * 🏛️ Parlement & Assemblée Nationale
 */
export const IconParliament: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M4 22h16" />
    <path d="M2 11h20" />
    <path d="m12 2 10 5H2l10-5Z" />
    <path d="M6 11v7" />
    <path d="M10 11v7" />
    <path d="M14 11v7" />
    <path d="M18 11v7" />
  </svg>
);

/**
 * 📍 Adresse BAN (Base Adresse Nationale)
 */
export const IconAddress: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/**
 * 🛍️ Marchés Publics (BOAMP)
 */
export const IconProcurement: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

/**
 * 💶 Aides & Subventions (Fonds Vert / Aides-Territoires)
 */
export const IconGrant: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H8" />
    <path d="M12 6v2m0 8v2" />
  </svg>
);

/**
 * 📊 Statistiques & Démographie (INSEE)
 */
export const IconStatistics: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
    <path d="M4 20h16" />
  </svg>
);

/**
 * 👤 Annuaire du Service Public
 */
export const IconAgent: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * 🗺️ Cadastre & Parcelles (DGFiP)
 */
export const IconCadastre: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

/**
 * 📝 Démarches-Simplifiées
 */
export const IconDemarche: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/**
 * 🌐 Open Data (data.gouv.fr)
 */
export const IconOpenData: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/**
 * 🔬 Recherche Publique & Publications
 */
export const IconResearch: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14h2" />
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
  </svg>
);

/**
 * 🧠 Albert IA Souveraine RAG
 */
export const IconAlbert: React.FC<SourceIconProps> = ({ size = 16, color = 'currentColor', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M12 2a4 4 0 0 0-4 4v1H6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2v3a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-3h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-2V6a4 4 0 0 0-4-4Z" />
    <circle cx="9" cy="11" r="1" fill={color} />
    <circle cx="15" cy="11" r="1" fill={color} />
    <path d="M9 16c1.5.8 4.5.8 6 0" />
  </svg>
);

/**
 * Dispatcher automatique selon l'EntityType
 */
export const SourceIcon: React.FC<{
  type: SourceEntityType | string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ type, size = 16, color = 'currentColor', className, style }) => {
  switch (type) {
    case 'law':
      return <IconLegi size={size} color={color} className={className} style={style} />;
    case 'case-law':
      return <IconJorf size={size} color={color} className={className} style={style} />;
    case 'company':
      return <IconCompany size={size} color={color} className={className} style={style} />;
    case 'parliament':
      return <IconParliament size={size} color={color} className={className} style={style} />;
    case 'address':
      return <IconAddress size={size} color={color} className={className} style={style} />;
    case 'place':
      return <IconAddress size={size} color={color} className={className} style={style} />;
    case 'procurement':
      return <IconProcurement size={size} color={color} className={className} style={style} />;
    case 'grant':
      return <IconGrant size={size} color={color} className={className} style={style} />;
    case 'insee':
    case 'statistics':
      return <IconStatistics size={size} color={color} className={className} style={style} />;
    case 'agent':
      return <IconAgent size={size} color={color} className={className} style={style} />;
    case 'cadastre':
      return <IconCadastre size={size} color={color} className={className} style={style} />;
    case 'demarche':
      return <IconDemarche size={size} color={color} className={className} style={style} />;
    case 'opendata':
      return <IconOpenData size={size} color={color} className={className} style={style} />;
    case 'research':
      return <IconResearch size={size} color={color} className={className} style={style} />;
    case 'custom':
      return <IconAlbert size={size} color={color} className={className} style={style} />;
    default:
      return <IconCodeLaw size={size} color={color} className={className} style={style} />;
  }
};
