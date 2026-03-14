export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']
export const ALLOWED_IMAGE_EXTS = ['jpg', 'jpeg', 'png']
export const ALLOWED_IMAGE_ERROR = 'Format gambar tidak didukung. Gunakan JPG, JPEG, atau PNG.'

/** Validates file extension and MIME type */
export function isAllowedImageFile(file: File): boolean {
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  return ALLOWED_IMAGE_TYPES.includes(file.type) && ALLOWED_IMAGE_EXTS.includes(ext)
}

// Magic bytes for supported image types
const IMAGE_SIGNATURES: { type: string; bytes: number[] }[] = [
  { type: 'jpeg', bytes: [0xff, 0xd8, 0xff] },
  { type: 'png', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
]

/** Validates file content by checking magic bytes (server-side only) */
export function isAllowedImageBuffer(buffer: Buffer): boolean {
  return IMAGE_SIGNATURES.some(({ bytes }) =>
    bytes.every((b, i) => buffer[i] === b)
  )
}
