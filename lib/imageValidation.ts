export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const ALLOWED_IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp']
export const ALLOWED_IMAGE_ERROR = 'Format gambar tidak didukung. Gunakan JPG, JPEG, PNG, atau WebP.'

/** Validates file extension and MIME type */
export function isAllowedImageFile(file: File): boolean {
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  return ALLOWED_IMAGE_TYPES.includes(file.type) && ALLOWED_IMAGE_EXTS.includes(ext)
}

// Magic bytes for supported image types
const IMAGE_SIGNATURES: { type: string; check: (buf: Buffer) => boolean }[] = [
  { type: 'jpeg', check: (buf) => buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff },
  {
    type: 'png',
    check: (buf) =>
      buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
      buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a,
  },
  {
    type: 'webp',
    check: (buf) =>
      buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50,
  },
]

/** Validates file content by checking magic bytes (server-side only) */
export function isAllowedImageBuffer(buffer: Buffer): boolean {
  // WebP signature check reads up to index 11, so we need at least 12 bytes
  const MIN_BUFFER_SIZE = 12
  if (buffer.length < MIN_BUFFER_SIZE) return false
  return IMAGE_SIGNATURES.some(({ check }) => check(buffer))
}
