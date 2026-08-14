import type { Lang } from '../i18n';
import logoImage from '../assets/fousyfisa-logo.jpg';

type AgencyLogoProps = {
  lang: Lang;
  compact?: boolean;
  className?: string;
  /** Pass a transparent PNG or SVG here when the final brand asset is available. */
  src?: string;
};

export default function AgencyLogo({ lang, compact = false, className = '', src = logoImage }: AgencyLogoProps) {
  const label = lang === 'ar' ? 'وكالة الفسيفساء للسياحة والأسفار' : 'Fousyfisa Travel & Tourism';
  return <span className={`inline-flex items-center gap-3 text-start ${className}`} aria-label={label}>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="h-14 w-14 shrink-0 object-contain object-center drop-shadow-[0_8px_16px_rgba(0,0,0,.45)] sm:h-16 sm:w-16"
    />
    {!compact && <span className="leading-tight"><strong className="block text-sm font-bold text-white">{lang === 'ar' ? 'الفسيفساء' : 'FOUSYFISA'}</strong><small className="block text-xs text-teal-300">{lang === 'ar' ? 'للسياحة والأسفار' : 'Travel & Tourism'}</small></span>}
  </span>;
}
