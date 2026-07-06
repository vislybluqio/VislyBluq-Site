import logoUrl from '../assets/vislybluq-vcube-logo.png';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
}

const BrandLogo = ({ className = '', imageClassName = '' }: BrandLogoProps) => (
  <span className={`inline-flex items-center ${className}`} aria-label="VislyBluq">
    <img
      src={logoUrl}
      alt="VislyBluq logo"
      className={`block object-contain ${imageClassName}`}
      loading="eager"
    />
  </span>
);

export default BrandLogo;
