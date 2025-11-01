// frontend/src/theme/index.ts
export const colors = {
  primary: '#A90D1A',
  primaryLight: '#FBE9EA',
  primaryDark: '#7C0A13',
  background: '#FFF1F2',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#0B0B0B',
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32,
} as const;

export const radius = {
  sm: 8, md: 12, lg: 16, xl: 24,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  small:{ fontSize: 12, fontWeight: '400' as const },
  family: 'System',
} as const;
