import logoUrl from '../assets/vislybluq-vcube-logo.png';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}

const BrandLogo = ({ className = '', imageClassName = '', textClassName = '' }: BrandLogoProps) => (
  <span className={`inline-flex items-center gap-3 ${className}`} aria-label="VislyBluq">
    <img
      src={logoUrl}
      alt="VislyBluq V-Cube logo mark"
      className={`block shrink-0 object-contain ${imageClassName}`}
      loading="eager"
    />
    <span className={`leading-none ${textClassName}`}>
      <span className="block text-xl font-extrabold tracking-tight text-white">VislyBluq</span>
      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-visly-cyan/75">
        Enterprise Tech
      </span>
    </span>
  </span>
);

export default BrandLogo;
