import Helpers from '../utils/helpers.utils';

export const ThemeStoreInitial = { name: Helpers.getInitialThemeFromLocal() };
export type ThemeStore = typeof ThemeStoreInitial & { update: (newTheme: string) => void };
export const WindowTitleStoreInitial = { title: 'Open Astral' };
export type WindowTitleStore = typeof WindowTitleStoreInitial & { updateTitle: (title: string) => void };
