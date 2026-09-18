import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const consumer = mkdtempSync(join(tmpdir(), 'lasuite-packages-'));
const run = (command, args, cwd = consumer) => execFileSync(command, args, {
  cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'],
  env: { ...process.env, NODE_PATH: '', npm_config_strict_ssl: 'true' },
});

try {
  const archives = ['slash-sources-sdk', 'blocknote-sources'].map((name) => {
    const output = JSON.parse(run('npm', ['pack', '--json', '--pack-destination', consumer], join(root, 'packages', name)));
    assert.equal(output.length, 1);
    assert(output[0].files.some((file) => file.path.startsWith('dist/')));
    return join(consumer, output[0].filename);
  });
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  const versions = ['@blocknote/core', '@blocknote/react', 'react', 'react-dom', 'styled-components', 'typescript', '@types/react', '@types/react-dom']
    .map((name) => `${name}@${JSON.parse(readFileSync(join(root, 'node_modules', name, 'package.json'), 'utf8')).version}`);
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', ...archives, ...versions]);
  const script = `
    import assert from 'node:assert/strict';
    import { createRequire } from 'node:module';
    import * as sdk from '@suitenumerique/slash-sources-sdk';
    import * as blocks from '@suitenumerique/blocknote-sources';
    import * as exporters from '@suitenumerique/blocknote-sources/exporters';
    const require = createRequire(import.meta.url);
    assert.equal(typeof sdk.defineSourceProvider, 'function');
    assert.equal(typeof blocks.SourceBlock, 'function');
    assert.equal(typeof blocks.createHttpSourceClient, 'function');
    assert.equal(typeof exporters.blockMappingSourceBlockDocx, 'function');
    assert.equal(typeof require('@suitenumerique/slash-sources-sdk').defineSourceProvider, 'function');
    assert.equal(typeof require('@suitenumerique/blocknote-sources').SourceBlock, 'function');
    assert.equal(typeof require('@suitenumerique/blocknote-sources/exporters').blockMappingSourceBlockPDF, 'function');
  `;
  writeFileSync(join(consumer, 'consumer.mjs'), script);
  run(process.execPath, ['consumer.mjs']);
  writeFileSync(join(consumer, 'consumer.mts'), `
    import { createHttpSourceClient, type SourceEntityProps } from '@suitenumerique/blocknote-sources';
    import { blockMappingSourceBlockDocx } from '@suitenumerique/blocknote-sources/exporters';
    export const client = createHttpSourceClient();
    export const record: SourceEntityProps = { sourceId: 'id', title: 'Title', entityType: 'law', displayMode: 'card' };
    export const mapping = blockMappingSourceBlockDocx;
  `);
  run(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit', '--strict', '--skipLibCheck', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', '--target', 'ES2022', 'consumer.mts']);
  process.stdout.write('Isolated npm archives: ESM, CommonJS and TypeScript imports passed.\n');
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
