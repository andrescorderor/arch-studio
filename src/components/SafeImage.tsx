import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> { alt: string }

/** Imagen con carga diferida y respaldo visual si la URL falla (nunca deja un icono roto). */
export function SafeImage({ alt, className = '', ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`bg-gradient-to-br from-[#222228] to-[#18181c] ${className}`} />
    );
  }
  return <img alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} {...rest} />;
}
