import logoUrl from '../assets/vislybluq-vcube-logo.png';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}

const BrandLogo = ({ className = '', imageClassName = 'h-8 w-8', textClassName = 'text-ink-text' }: BrandLogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <img src={logoUrl} alt="" aria-hidden="true" className={`block shrink-0 object-contain ${imageClassName}`} loading="eager" />
    <span className={`text-[17px] font-semibold tracking-[-0.02em] ${textClassName}`}>VislyBluq</span>
  </span>
);

/** The V-Cube mark on its own, for decorative use. */
export const BrandMark = ({ className = '' }: { className?: string }) => (
  <img src={logoUrl} alt="" aria-hidden="true" className={`block object-contain ${className}`} />
);

export default BrandLogo;
