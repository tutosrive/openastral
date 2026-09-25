import Helpers from '../utils/helpers.utils';
import type { Repository, Topic } from './models';

export const ThemeStoreInitial = { name: Helpers.getInitialThemeFromLocal() };
export type ThemeStore = typeof ThemeStoreInitial & { update: (newTheme: string) => void };
export const WindowTitleStoreInitial = { title: 'Open Astral' };
export type WindowTitleStore = typeof WindowTitleStoreInitial & { updateTitle: (title: string) => void };
export type SearchType = 'category' | 'repository' | 'mix';
export type SearchStore = { results: Repository[] | Topic[]; type: SearchType; updateType: (newType: SearchType) => void };
