export interface InstallTemplateRef {
  category: string;
  name: string;
}

function templatePath(themeId: string, template: InstallTemplateRef): string {
  return `${themeId}/${template.category}/${template.name}`;
}

export function buildTemplateInstallCommand(themeId: string, template: InstallTemplateRef): string {
  return `npx letterkit add ${templatePath(themeId, template)}`;
}

export function buildTemplatesInstallCommand(
  themeId: string,
  templates: InstallTemplateRef[],
): string | null {
  if (templates.length === 0) return null;

  const commands = templates.map((template) => buildTemplateInstallCommand(themeId, template));

  if (commands.length === 1) return commands[0] ?? null;

  return commands.join(' && ');
}

export function buildThemeInstallCommand(themeId: string): string {
  return `npx letterkit theme add ${themeId}`;
}
