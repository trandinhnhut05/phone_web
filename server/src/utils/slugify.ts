import slugify from 'slugify';

export function createSlug(text: string): string {
  const base = slugify(text, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  });
  return `${base}-${Date.now().toString().slice(-4)}`;
}

export function createCleanSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  });
}
