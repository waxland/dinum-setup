"""Script generating providers_backlog.json and PROVIDERS_BACKLOG.md (R-04.05)."""

import json
import os
import django
from django.conf import settings

if not settings.configured:
    settings.configure(
        DEBUG=True,
        INSTALLED_APPS=['django.contrib.contenttypes', 'django.contrib.auth', 'lasuite_sources'],
        DATABASES={'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': ':memory:'}}
    )
    django.setup()

from lasuite_sources.registry import source_registry
import lasuite_sources.providers  # noqa: F401

inventory_path = 'packages/django-lasuite-sources/docs/providers_inventory.json'
with open(inventory_path, 'r', encoding='utf-8') as f:
    inv_data = json.load(f)

backlog_items = []

for p in inv_data['providers']:
    if p['mode'] == 'connected':
        continue  # Connected providers (like BAN address) are active

    p_id = p['id']
    provider_inst = source_registry.get_provider(p_id)

    # Determine prerequisites and contracts
    auth = p['authentication']
    if auth == 'piste_oauth2':
        prereqs = ['PISTE_CLIENT_ID', 'PISTE_CLIENT_SECRET', 'PISTE_TOKEN_URL (optional)']
        contract_type = 'REST / JSON (OAuth2 Client Credentials)'
    elif auth == 'api_key':
        prereqs = [f"SLASHER_{p['country'].upper()}_{p_id.upper()}_API_KEY"]
        contract_type = 'REST / JSON (API Key header or query param)'
    elif auth == 'bearer_token':
        prereqs = ['ALBERT_API_KEY', 'ALBERT_API_URL (optional)']
        contract_type = 'REST / JSON (Bearer Token)'
    elif auth == 'oauth2':
        prereqs = [f"SLASHER_{p['country'].upper()}_{p_id.upper()}_CLIENT_ID", f"SLASHER_{p['country'].upper()}_{p_id.upper()}_CLIENT_SECRET"]
        contract_type = 'REST / JSON (OAuth2 Token)'
    else:
        prereqs = ['Production CORS / Domain approval', 'Rate limit quota allocation']
        contract_type = 'REST / JSON / OData / SPARQL (Public Endpoint)'

    test_file_name = p['test_suite'].split('/')[-1]
    recipe = f"1) Set env vars: {', '.join(prereqs)}; 2) Run pytest packages/django-lasuite-sources/tests/{test_file_name}; 3) Verify status in GET /api/v1.0/sources/status/"

    backlog_item = {
        'id': p_id,
        'name': p['name'],
        'class_name': p['class_name'],
        'country': p['country'],
        'category': p['category'],
        'official_endpoint': p['official_endpoint'],
        'authentication': auth,
        'prerequisites': prereqs,
        'contract_type': contract_type,
        'honest_status': 'demo_only' if p['mode'] == 'demo_only' else 'disabled',
        'verification_recipe': recipe,
        'test_suite': p['test_suite']
    }
    backlog_items.append(backlog_item)

# Save JSON
out_json_path = 'packages/django-lasuite-sources/docs/providers_backlog.json'
with open(out_json_path, 'w', encoding='utf-8') as f:
    json.dump({'version': '1.0.0', 'last_updated': '2026-09-28', 'backlog': backlog_items}, f, indent=2, ensure_ascii=False)

# Save Markdown
out_md_path = 'packages/django-lasuite-sources/docs/PROVIDERS_BACKLOG.md'
md_lines = [
    '# 🛠️ Sovereign Source Providers Integration Backlog',
    '',
    '**Version:** 1.0.0  ',
    '**Date:** 28 September 2026  ',
    '**Reference:** `lasuite_sources.registry.source_registry`  ',
    f'**Total Backlog Items:** {len(backlog_items)} connectors maintained in honest `demo_only` / `disabled` mode until live credentials and endpoints are validated.',
    '',
    '| ID | Fournisseur | Pays | Statut Honnête | Contrat API | Prérequis d\'Activation | Recette de Validation |',
    '| --- | --- | --- | --- | --- | --- | --- |'
]

for item in backlog_items:
    pr_str = ', '.join(f'`{pr}`' for pr in item['prerequisites'])
    md_lines.append(f"| `{item['id']}` | **{item['name']}** | `{item['country']}` | `{item['honest_status']}` | {item['contract_type']} | {pr_str} | {item['verification_recipe']} |")

with open(out_md_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_lines) + '\n')

print(f'Successfully generated backlog for {len(backlog_items)} non-connected providers!')
