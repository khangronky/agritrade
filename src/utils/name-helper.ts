export function getInitials(value: string | null | undefined) {
  const source = value?.trim();

  if (!source) {
    return 'AT';
  }

  return source
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
