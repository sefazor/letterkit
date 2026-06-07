import { CommandLine } from '@/components/marketing/command-line';

interface ThemesHeaderProps {
  featuredThemeId: string;
}

export function ThemesHeader({ featuredThemeId }: ThemesHeaderProps) {
  return (
    <section className="mb-16 pt-2 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="text-[15px] text-muted-foreground">
          Curated collections with shared layout and design tokens
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          Themes
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Complete transactional email collections with shared components, brand config, and design
          tokens. Copy a theme into your repo and customize every template.
        </p>

        <div className="mx-auto mt-10 max-w-xl text-left">
          <CommandLine
            stacked
            comment="Install every template from a theme"
            command={`npx @letterkit/cli@latest theme add ${featuredThemeId}`}
          />
        </div>
      </div>
    </section>
  );
}
