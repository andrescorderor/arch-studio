/** Comprime una imagen subida por el usuario a WebP/JPEG Data URL para guardarla en Firestore ($0 USD, sin Storage). */
export async function compressImageToDataUrl(
  file: File,
  maxWidth = 1200,
  quality = 0.78,
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('INVALID_IMAGE_TYPE');
  }

  const bitmap = await loadImageElement(file);
  const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('CANVAS_UNAVAILABLE');

  ctx.drawImage(bitmap, 0, 0, width, height);

  let dataUrl = canvas.toDataURL('image/webp', quality);
  if (!dataUrl.startsWith('data:image/webp')) {
    dataUrl = canvas.toDataURL('image/jpeg', quality);
  }

  // Límite seguro debajo de 1 MiB de Firestore (~750 KB en base64)
  if (dataUrl.length > 750_000) {
    dataUrl = canvas.toDataURL('image/jpeg', 0.62);
  }
  if (dataUrl.length > 900_000) {
    throw new Error('IMAGE_TOO_LARGE');
  }
  return dataUrl;
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('IMAGE_LOAD_ERROR'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('FILE_READ_ERROR'));
    reader.readAsDataURL(file);
  });
}
