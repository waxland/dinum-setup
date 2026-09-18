import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import Button from '@codegouvfr/react-dsfr/Button';
import Input from '@codegouvfr/react-dsfr/Input';
import Select from '@codegouvfr/react-dsfr/Select';
import { useSourceSearch } from '../hooks/useSourceSearch';
import { useSourceSearchConfiguration } from '../SourceSearchContext';
import type { SupportedCountry } from '../mockData';
import type { SourceSearchClient } from '../searchClient';
import { isSourceEntityType, SOURCE_ENTITY_TYPES, SourceEntityProps, SourceEntityType } from '../types';

interface SourceSearchPopoverProps {
  initialType?: SourceEntityType;
  initialCountry?: SupportedCountry;
  client?: SourceSearchClient;
  onSelect: (entity: SourceEntityProps) => void;
  onCancel: () => void;
}

export const SOURCE_COUNTRIES: SupportedCountry[] = ['fr', 'de', 'nl', 'es', 'eu', 'ca'];
const countries: Record<SupportedCountry, string> = {
  fr: 'France', de: 'Allemagne', nl: 'Pays-Bas', es: 'Espagne', eu: 'Union europeenne', ca: 'Canada',
};

export const SourceSearchPopover: React.FC<SourceSearchPopoverProps> = ({ initialType = 'law', initialCountry, client, onSelect, onCancel }) => {
  const configuration = useSourceSearchConfiguration();
  const [category, setCategory] = useState(initialType);
  const [countryOverride, setCountryOverride] = useState<SupportedCountry>();
  const country = countryOverride || initialCountry || configuration.country;
  const { query, setQuery, results, isLoading, error } = useSourceSearch({
    entityType: category, country, client: client || configuration.client,
  });
  const [selection, setSelection] = useState(0);
  const active = Math.min(selection, Math.max(0, results.length - 1));
  const input = useRef<HTMLInputElement>(null);
  const activeOption = useRef<HTMLDivElement>(null);
  const listId = useId();
  const statusId = useId();

  useEffect(() => { input.current?.focus(); }, []);
  useEffect(() => { activeOption.current?.scrollIntoView?.({ block: 'nearest' }); }, [active, results]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const increment = event.key === 'ArrowDown' ? 1 : -1;
      setSelection(results.length ? (active + increment + results.length) % results.length : 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = results[active];
      if (item) {onSelect(item);}
    }
  };

  return (
    <section contentEditable={false} aria-label="Recherche de sources"
      className="fr-p-2w" style={{ width: '100%', maxWidth: 680, background: 'var(--background-default-grey)', color: 'var(--text-default-grey)' }}
      onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onCancel(); } }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Select label="Categorie" nativeSelectProps={{ value: category, onChange: (event) => {
          if (isSourceEntityType(event.target.value)) { setCategory(event.target.value); setSelection(0); }
        } }}>
          {SOURCE_ENTITY_TYPES.map((value) => <option key={value} value={value}>{value}</option>)}
        </Select>
        <Select label="Pays" nativeSelectProps={{ value: country, onChange: (event) => {
          const selected = SOURCE_COUNTRIES.find((value) => value === event.target.value);
          if (selected) { setCountryOverride(selected); setSelection(0); }
        } }}>
          {SOURCE_COUNTRIES.map((value) => <option key={value} value={value}>{countries[value]}</option>)}
        </Select>
      </div>
      <Input label="Rechercher une source" nativeInputProps={{
        ref: input, value: query, role: 'combobox', 'aria-expanded': true,
        'aria-controls': listId, 'aria-autocomplete': 'list', 'aria-describedby': statusId,
        'aria-activedescendant': results[active] ? `${listId}-${active}` : undefined,
        onChange: (event) => { setQuery(event.target.value); setSelection(0); }, onKeyDown: handleKeyDown,
      }} />
      <p id={statusId} role="status" aria-live="polite" className="fr-text--sm">
        {error || (isLoading ? 'Recherche en cours...' : !query.trim() ? '' : `${results.length} resultat(s)`)}
      </p>
      <div id={listId} role="listbox" aria-label="Resultats de recherche" aria-busy={isLoading}
        style={{ maxHeight: 300, overflowY: 'auto' }}>
        {results.map((item, index) => (
          <div key={`${item.provider || item.entityType}:${item.sourceId}`} id={`${listId}-${index}`}
            ref={index === active ? activeOption : undefined} role="option" aria-selected={index === active}
            tabIndex={-1} onClick={() => onSelect(item)} onMouseEnter={() => setSelection(index)}
            className="fr-p-2w"
            style={{ cursor: 'pointer', overflowWrap: 'anywhere', background: index === active ? 'var(--background-contrast-info)' : undefined,
              borderBottom: '1px solid var(--border-default-grey)' }}>
            <strong>{item.title}</strong>
            {item.subtitle && <div>{item.subtitle}</div>}
            {item.status && <span className="fr-badge fr-badge--sm">{item.status}</span>}
          </div>
        ))}
      </div>
      <div className="fr-mt-2w" style={{ display: 'flex', gap: 8 }}>
        <Button priority="tertiary" iconId="fr-icon-close-line" title="Fermer la recherche" onClick={onCancel} />
        {query && <Button priority="tertiary" iconId="fr-icon-delete-line" title="Effacer la recherche"
          onClick={() => { setQuery(''); input.current?.focus(); }} />}
      </div>
    </section>
  );
};
