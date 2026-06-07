import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const themeRoot = join(import.meta.dirname, '../themes/grundy');

const BRAND_IMPORTS = `import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
`;

function walkTemplates(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === '_components') continue;
      results.push(...walkTemplates(full));
    } else if (entry === 'index.tsx') {
      results.push(full);
    }
  }
  return results;
}

function migrateIndex(path: string): void {
  let content = readFileSync(path, 'utf-8');

  if (content.includes('grundyBrand')) return;

  content = content.replace(/import \{ grundy \} from '\.\.\/\.\.\/theme\.config';\n/, '');
  content = content.replace(/\n  const \{ tokens \} = grundy;\n/, '\n');

  if (!content.includes('EmailBrandProps')) {
    content = content.replace(/^(import .+;\n)/m, `$1${BRAND_IMPORTS}`);
  }

  content = content.replace(
    /export interface (\w+Props) \{\n/,
    `export interface $1 {\n  brand?: EmailBrandProps;\n  tokens?: PartialGrundyTokens;\n  recipientEmail?: string;\n`,
  );

  content = content.replace(/\n  appName: string;\n/g, '\n');
  content = content.replace(/\n  logoUrl\?: string;\n/g, '\n');
  content = content.replace(/\n  logoAlt\?: string;\n/g, '\n');

  content = content.replace(
    /export function (\w+)\(\{\n/,
    'export function $1({\n  brand = grundyBrand,\n  tokens,\n  recipientEmail,\n',
  );

  content = content.replace(
    /export function (\w+)\(\{([^}]+)\}: (\w+Props)\) \{\n/,
    (match, name, params, iface) => {
      if (params.includes('brand = grundyBrand')) return match;
      return `export function ${name}({\n  brand = grundyBrand,\n  tokens,\n  recipientEmail,\n${params}}: ${iface}) {\n`;
    },
  );

  if (content.includes('appName') && !content.includes('const appName = brand.appName')) {
    content = content.replace(
      /(\}: \w+Props\) \{\n)/,
      `$1  const appName = brand.appName;\n`,
    );
  }

  content = content.replace(
    /<EmailLayout\n([\s\S]*?)\/>/g,
    (block) => {
      let next = block;
      next = next.replace(/\s*tokens=\{tokens\}\n/, '\n');
      next = next.replace(/\s*appName=\{appName\}\n/, '\n');
      next = next.replace(/\s*logoUrl=\{logoUrl\}\n/, '\n');
      next = next.replace(/\s*logoAlt=\{logoAlt\}\n/, '\n');
      next = next.replace(/\s*unsubscribeUrl=\{[^}]+\}\n/, '\n');
      next = next.replace(/\s*unsubscribeUrl="[^"]*"\n/, '\n');
      next = next.replace(/\s*addressLine=\{[^}]+\}\n/, '\n');
      if (!next.includes('brand={brand}')) {
        next = next.replace(
          /<EmailLayout\n/,
          '<EmailLayout\n      brand={brand}\n      tokens={tokens}\n      recipientEmail={recipientEmail}\n',
        );
      }
      return next;
    },
  );

  content = content.replace(/ tokens=\{tokens\}/g, '');
  content = content.replace(/,\n  logoUrl,\n  logoAlt/g, '');
  content = content.replace(/,\n  logoUrl/g, '');
  content = content.replace(/,\n  logoAlt/g, '');
  content = content.replace(/,\n  appName/g, '');

  writeFileSync(path, content);
}

function migratePreview(path: string): void {
  let content = readFileSync(path, 'utf-8');
  content = content.replace(/\n  appName: '[^']*',/g, '');
  content = content.replace(/\n  logoUrl: '[^']*',/g, '');
  content = content.replace(/\n  logoAlt: '[^']*',/g, '');

  if (!content.includes('recipientEmail')) {
    content = content.replace(
      /export const previewProps = \{/,
      "export const previewProps = {\n  recipientEmail: 'alex@company.com',",
    );
  }

  writeFileSync(path, content);
}

for (const indexPath of walkTemplates(themeRoot)) {
  migrateIndex(indexPath);
  const previewPath = join(indexPath.replace(/index\.tsx$/, ''), 'preview.tsx');
  try {
    migratePreview(previewPath);
  } catch {
    // preview optional
  }
}

console.log('Migrated Grundy templates to brand/tokens props pattern.');
