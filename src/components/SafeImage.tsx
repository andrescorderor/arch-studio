import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> { alt: string }

/** Imagen con carga diferida y respaldo visual si la URL falla (nunca deja un icono roto). */
export function SafeImage({ alt, className = '', ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed || !rest.src) {
    return (
      <div role="img" aria-label={alt} className={`bg-gradient-to-br from-[#e4e4e7] to-[#f4f4f5] ${className}`} />
    );
  }
  return <img alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} {...rest} />;
}
