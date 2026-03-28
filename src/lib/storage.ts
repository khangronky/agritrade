const AVATAR_BUCKET = 'avatars';
const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

const STORAGE_PUBLIC_SEGMENT = '/storage/v1/object/public/';

function sanitizeStorageSegment(segment: string) {
  return segment
    .normalize('NFKD')
    .replace(/[^\u0020-\u007E]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-._]+|[-._]+$/g, '')
    .trim();
}

export function sanitizeStoragePath(path: string) {
  const normalizedSegments = path
    .split(/[\\/]+/)
    .map((segment) => sanitizeStorageSegment(segment))
    .filter(Boolean);

  return normalizedSegments.join('/');
}

export function sanitizeFileName(fileName: string) {
  const sanitized = sanitizeStorageSegment(fileName);

  if (!sanitized) {
    return 'file';
  }

  return sanitized;
}

export function buildStorageObjectPath(basePath: string, fileName: string) {
  const sanitizedBasePath = sanitizeStoragePath(basePath);
  const sanitizedFileName = sanitizeFileName(fileName);
  const uniqueFileName = `${crypto.randomUUID()}-${sanitizedFileName}`;

  return sanitizedBasePath
    ? `${sanitizedBasePath}/${uniqueFileName}`
    : uniqueFileName;
}

export function getAvatarBasePath(userId: string) {
  return `users/${userId}/avatars`;
}

export function isAvatarPathOwnedByUser(userId: string, path: string) {
  const sanitizedPath = sanitizeStoragePath(path);
  const ownedPrefix = `${sanitizeStoragePath(`users/${userId}`)}/`;

  return sanitizedPath.startsWith(ownedPrefix);
}

export function extractStorageObjectFromPublicUrl(publicUrl: string | null) {
  if (!publicUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(publicUrl);
    const publicPathIndex = parsedUrl.pathname.indexOf(STORAGE_PUBLIC_SEGMENT);

    if (publicPathIndex === -1) {
      return null;
    }

    const objectPath = parsedUrl.pathname
      .slice(publicPathIndex + STORAGE_PUBLIC_SEGMENT.length)
      .split('/')
      .map((segment) => decodeURIComponent(segment));

    const [bucket, ...pathSegments] = objectPath;
    const path = pathSegments.join('/');

    if (!bucket || !path) {
      return null;
    }

    return { bucket, path };
  } catch {
    return null;
  }
}

export { ALLOWED_IMAGE_MIME_TYPES, AVATAR_BUCKET, MAX_UPLOAD_SIZE_BYTES };
