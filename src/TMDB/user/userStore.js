import { create } from 'zustand'

const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;
const TMDB_Key = import.meta.env.VITE_TMDB_KEY;

const useUserStore = create((set, get) => ({

    selected: { text: [], type: [], listType: [] },
    setSelected: (val) => set({ selected: val }),

    data: [],
    setData: (val) => set({ data: val }),

    dataLoader: false,
    setDataLoader: (val) => { set({ dataLoader: val }) },

    lists: [],
    setLists: (val) => set({ lists: val }),

    
}));
export default useUserStore;