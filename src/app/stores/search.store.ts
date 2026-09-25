import { create } from 'zustand';
import type { SearchStore, SearchType } from '../models/store-types.model';
import type { Repository, Topic } from '../models/models';

export const useSearch = create<SearchStore>((set) => ({ result: [], type: 'mix', updateType: (newType: SearchType) => set({ type: newType }), updateResult: (newResult: Repository[] | Topic[]) => set({ result: newResult }) }));
