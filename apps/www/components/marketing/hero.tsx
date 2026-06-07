import { CommandLine } from '@/components/marketing/command-line';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroProps {
  featuredThemeId: string;
  themeCount: number;
}

export function Hero({ featuredThemeId, themeCount }: HeroProps) {
  return (
    <section className="mb-24 pt-6 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="text-[15px] text-muted-foreground">
          {themeCount} different templates
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          Complete email systems you copy into your repo
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Transactional email collections with shared layout, brand config, and design tokens. Copy
          a theme into your project and own every template.
        </p>

        <div className="mx-auto mt-10 max-w-xl space-y-3 text-left">
          <CommandLine stacked comment="Initialize letterkit" command="npx letterkit init" />
          <CommandLine
            stacked
            comment="Install a theme"
            command={`npx letterkit theme add ${featuredThemeId}`}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-10 rounded-full bg-primary px-5 text-sm text-primary-foreground hover:opacity-90"
          >
            <Link href="/themes">Browse themes</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-10 rounded-full border-border px-5 text-sm"
          >
            <Link href="/docs">Read docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
