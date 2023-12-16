export const i18n = {
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
} as const

export type Locale = (typeof i18n)['locales'][number]
