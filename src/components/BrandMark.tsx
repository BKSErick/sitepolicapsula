interface BrandMarkProps {
  inverted?: boolean;
}

/** Logo oficial: cápsula laranja com "POLI". A versão invertida troca o texto grafite por branco. */
export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <img
      className="brand-mark"
      src={inverted ? '/brand/policapsula-logo-white.png' : '/brand/policapsula-logo.png'}
      alt="Policápsula"
      width="165"
      height="50"
    />
  );
}
