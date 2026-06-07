import {
  LETTERKIT_LOGO_ALT,
  LETTERKIT_LOGO_LIGHT_SRC,
  LETTERKIT_LOGO_SRC,
  letterkitLogoWidth,
} from '@/lib/brand-assets';
import { cn } from '@/lib/utils';

interface LetterkitLogoProps {
  className?: string;
  height?: number;
  /** header = dark pill nav; page = main marketing background */
  surface?: 'header' | 'page';
}

/**
 * Wordmark from public/. Picks the SVG that contrasts with the surface.
 */
export function LetterkitLogo({ className, height = 20, surface = 'header' }: LetterkitLogoProps) {
  const width = letterkitLogoWidth(height);
  const lightModeSrc = surface === 'page' ? LETTERKIT_LOGO_SRC : LETTERKIT_LOGO_LIGHT_SRC;
  const darkModeSrc = surface === 'page' ? LETTERKIT_LOGO_LIGHT_SRC : LETTERKIT_LOGO_SRC;

  return (
    <>
      <img
        src={lightModeSrc}
        alt={LETTERKIT_LOGO_ALT}
        width={width}
        height={height}
        className={cn('w-auto dark:hidden', className)}
        style={{ height }}
      />
      <img
        src={darkModeSrc}
        alt={LETTERKIT_LOGO_ALT}
        width={width}
        height={height}
        className={cn('hidden w-auto dark:block', className)}
        style={{ height }}
      />
    </>
  );
}
