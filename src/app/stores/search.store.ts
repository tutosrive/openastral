import { create } from 'zustand';
import type { SearchStore, SearchType } from '../models/store-types.model';

export const useSearch = create<SearchStore>((set) => ({ results: [], type: 'mix', updateType: (newType: SearchType) => set({ type: newType }) }));
