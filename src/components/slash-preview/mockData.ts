import { SourceEntityProps } from "./types";

export const MOCK_SOURCES: Record<string, SourceEntityProps[]> = {
  law: [
    {
      sourceType: "law",
      sourceId: "LEGIARTI000038814944",
      provider: "Légifrance (PISTE)",
      title: "Article L. 111-1",
      subtitle: "Code de la commande publique",
      status: "VIGUEUR",
      statusBadgeColor: "success",
      contentHtml:
        "<p>Un acheteur ou une autorité concédante est un pouvoir adjudicateur ou une entité adjudicatrice au sens du présent livre.</p>",
      summary: "Définition des pouvoirs adjudicateurs et entités adjudicatrices.",
      metaField1Label: "Code",
      metaField1Value: "Commande publique",
      metaField2Label: "Date d'effet",
      metaField2Value: "01/04/2019",
      metaField3Label: "Identifiant",
      metaField3Value: "LEGIARTI000038814944",
      displayMode: "callout",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038814944",
    },
    {
      sourceType: "law",
      sourceId: "LEGIARTI000006389959",
      provider: "Légifrance (PISTE)",
      title: "Article L. 2121-29",
      subtitle: "Code général des collectivités territoriales (CGCT)",
      status: "VIGUEUR",
      statusBadgeColor: "success",
      contentHtml:
        "<p>Le conseil municipal règle par ses délibérations les affaires de la commune. Il donne son avis toutes les fois que cet avis est requis par les lois et règlements.</p>",
      summary: "Clause générale de compétence du conseil municipal.",
      metaField1Label: "Code",
      metaField1Value: "CGCT",
      metaField2Label: "Date d'effet",
      metaField2Value: "21/02/1996",
      metaField3Label: "Identifiant",
      metaField3Value: "LEGIARTI000006389959",
      displayMode: "callout",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006389959",
    },
    {
      sourceType: "law",
      sourceId: "LEGIARTI000031721245",
      provider: "Légifrance (PISTE)",
      title: "Article R. 111-27",
      subtitle: "Code de l'urbanisme",
      status: "VIGUEUR",
      statusBadgeColor: "success",
      contentHtml:
        "<p>Le projet peut être refusé ou n'être accepté que sous réserve de prescriptions spéciales si les constructions sont de nature à porter atteinte au caractère des lieux avoisinants.</p>",
      summary: "Règles nationales relatives à l'insertion paysagère des projets d'urbanisme.",
      metaField1Label: "Code",
      metaField1Value: "Urbanisme",
      metaField2Label: "Date d'effet",
      metaField2Value: "01/01/2016",
      metaField3Label: "Identifiant",
      metaField3Value: "LEGIARTI000031721245",
      displayMode: "callout",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031721245",
    },
  ],
  company: [
    {
      sourceType: "company",
      sourceId: "849201928",
      provider: "Pappers / API Entreprise",
      title: "DINUM PARTNERS SAS",
      subtitle: "Société par actions simplifiée (SAS)",
      status: "IN BONIS",
      statusBadgeColor: "success",
      contentHtml:
        "<p><strong>Président :</strong> M. Jean Martin. <strong>Siège :</strong> 20 avenue de Ségur, 75007 Paris. Capital social : 50 000 €.</p>",
      summary: "Conseil en systèmes et logiciels informatiques (62.02A).",
      metaField1Label: "SIREN",
      metaField1Value: "849 201 928",
      metaField2Label: "Code NAF",
      metaField2Value: "62.02A",
      metaField3Label: "Dirigeant",
      metaField3Value: "M. Jean Martin",
      displayMode: "card",
      url: "https://annuaire-entreprises.data.gouv.fr/entreprise/849201928",
    },
    {
      sourceType: "company",
      sourceId: "433957778",
      provider: "Pappers / API Entreprise",
      title: "SCALEWAY SAS",
      subtitle: "Société par actions simplifiée",
      status: "IN BONIS",
      statusBadgeColor: "success",
      contentHtml:
        "<p><strong>Président :</strong> M. Damien Lucas. Fournisseur de Cloud souverain et d'infrastructures d'hébergement européen.</p>",
      summary: "Traitement de données, hébergement et activités connexes (63.11Z).",
      metaField1Label: "SIREN",
      metaField1Value: "433 957 778",
      metaField2Label: "Code NAF",
      metaField2Value: "63.11Z",
      metaField3Label: "Dirigeant",
      metaField3Value: "M. Damien Lucas",
      displayMode: "card",
      url: "https://annuaire-entreprises.data.gouv.fr/entreprise/433957778",
    },
    {
      sourceType: "company",
      sourceId: "418166029",
      provider: "Pappers / API Entreprise",
      title: "OCTO TECHNOLOGY",
      subtitle: "Société par actions simplifiée",
      status: "IN BONIS",
      statusBadgeColor: "success",
      contentHtml:
        "<p>Cabinet de conseil en technologies, transformation numérique et architecture logicielle pour le secteur public.</p>",
      summary: "Conseil en systèmes et logiciels informatiques (62.02A).",
      metaField1Label: "SIREN",
      metaField1Value: "418 166 029",
      metaField2Label: "Code NAF",
      metaField2Value: "62.02A",
      metaField3Label: "Dirigeant",
      metaField3Value: "M. Ludovic Cinquin",
      displayMode: "card",
      url: "https://annuaire-entreprises.data.gouv.fr/entreprise/418166029",
    },
  ],
  parliament: [
    {
      sourceType: "parliament",
      sourceId: "DLR5L17N120:142",
      provider: "Assemblée nationale (claire.vite)",
      title: "Amendement n° 142 (Article 4)",
      subtitle: "Projet de loi souveraineté numérique — Groupe EPR",
      status: "ADOPTÉ",
      statusBadgeColor: "success",
      contentHtml:
        "<p>À l'alinéa 2, substituer aux mots 'logiciels propriétaires' les mots 'logiciels libres et souverains prioritaires'.</p>",
      summary: "Cet amendement vise à conforter la préférence pour le logiciel libre dans l'État.",
      metaField1Label: "Groupe",
      metaField1Value: "EPR",
      metaField2Label: "Auteur",
      metaField2Value: "Mme Dupont et coll.",
      metaField3Label: "Sort",
      metaField3Value: "Adopté",
      displayMode: "callout",
      url: "https://www.assemblee-nationale.fr",
    },
    {
      sourceType: "parliament",
      sourceId: "DLR5L17N120:88",
      provider: "Assemblée nationale (claire.vite)",
      title: "Amendement n° 88 (Article 2)",
      subtitle: "Projet de loi simplification administrative — Groupe Socialistes",
      status: "REJETÉ",
      statusBadgeColor: "error",
      contentHtml:
        "<p>Supprimer les alinéas 4 à 7 de l'article 2 concernant la dématérialisation obligatoire des démarches d'état civil.</p>",
      summary: "Exposé sommaire : Préserver l'accueil physique des usagers en zone rurale.",
      metaField1Label: "Groupe",
      metaField1Value: "Socialistes",
      metaField2Label: "Auteur",
      metaField2Value: "M. Bertrand",
      metaField3Label: "Sort",
      metaField3Value: "Rejeté",
      displayMode: "card",
      url: "https://www.assemblee-nationale.fr",
    },
  ],
  address: [
    {
      sourceType: "address",
      sourceId: "75107_8863_00020",
      provider: "Base Adresse Nationale (BAN)",
      title: "20 Avenue de Ségur, 75007 Paris",
      subtitle: "Code Postal : 75007 — Commune : Paris",
      status: "CERTIFIÉE BAN",
      statusBadgeColor: "info",
      contentHtml:
        "<p><strong>Adresse officielle :</strong> 20 Avenue de Ségur, 75007 Paris</p><p>Coordonnées GPS : 48.8512, 2.3087 (WGS84)</p>",
      summary: "Siège des ministères sociaux et de la DINUM (75007).",
      metaField1Label: "Code INSEE",
      metaField1Value: "75107",
      metaField2Label: "Type",
      metaField2Value: "Numéro et voie",
      metaField3Label: "Coordonnées GPS",
      metaField3Value: "48.8512, 2.3087",
      displayMode: "link",
      url: "https://adresse.data.gouv.fr",
    },
    {
      sourceType: "address",
      sourceId: "44109_4520_00014",
      provider: "Base Adresse Nationale (BAN)",
      title: "14 Rue des Lilas, 44000 Nantes",
      subtitle: "Code Postal : 44000 — Commune : Nantes",
      status: "CERTIFIÉE BAN",
      statusBadgeColor: "info",
      contentHtml:
        "<p><strong>Adresse certifiée :</strong> 14 Rue des Lilas, 44000 Nantes</p><p>Coordonnées GPS : 47.2184, -1.5536 (WGS84)</p>",
      summary: "Commune de Nantes (Loire-Atlantique).",
      metaField1Label: "Code INSEE",
      metaField1Value: "44109",
      metaField2Label: "Type",
      metaField2Value: "Numéro et voie",
      metaField3Label: "Coordonnées GPS",
      metaField3Value: "47.2184, -1.5536",
      displayMode: "card",
      url: "https://adresse.data.gouv.fr",
    },
  ],
};

export function searchMockSources(
  query: string,
  type?: string
): SourceEntityProps[] {
  const cleanQ = query.toLowerCase().trim();
  const pool = type
    ? MOCK_SOURCES[type] || []
    : Object.values(MOCK_SOURCES).flat();

  if (!cleanQ) {
    return pool;
  }

  return pool.filter(
    (item) =>
      item.title.toLowerCase().includes(cleanQ) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(cleanQ)) ||
      (item.summary && item.summary.toLowerCase().includes(cleanQ)) ||
      (item.metaField1Value &&
        item.metaField1Value.toLowerCase().includes(cleanQ))
  );
}
