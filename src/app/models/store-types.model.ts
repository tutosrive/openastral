export const ThemeStoreInitial = { name: localStorage.getItem('theme') ?? 'default' };
export type ThemeStore = typeof ThemeStoreInitial & { update: (newTheme: string) => void };
export const WindowTitleStoreInitial = { title: 'Open Astral' };
export type WindowTitleStore = typeof WindowTitleStoreInitial & { updateTitle: (title: string) => void };
