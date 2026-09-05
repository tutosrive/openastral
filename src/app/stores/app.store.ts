import { create } from 'zustand';
import { ThemeStoreInitial, WindowTitleStoreInitial, type ThemeStore, type WindowTitleStore } from '../models/store-types.model';

export const useTheme = create<ThemeStore>((set) => ({ ...ThemeStoreInitial, update: (newTheme: string) => set({ name: newTheme }) }));
export const useWindowTitle = create<WindowTitleStore>((set) => ({ ...WindowTitleStoreInitial, updateTitle: (title: string) => set({ title: title }) }));
