import { create } from "zustand";

const TMDB_Key = import.meta.env.VITE_TMDB_KEY;

const useNavStore = create((set) => ({
    selected: "",
    searchTotalPages: 0,

    country: [],
    providers: [],
    discover: [],
    searchData: { sort_by: "popularity.desc", watch_region: "IN", with_watch_providers: null, with_genres: null },

    loading: false,

    setSearchData: (val) =>
        set((state) => ({
            ...state,
            searchData: {
                ...state.searchData,
                ...val,
            },
        })),


    setCountry: (countries) =>
        set(() => ({
            country: countries,
            selected:
                countries.find((c) => c.iso_3166_1 === "IN")?.iso_3166_1 || "",
        })),

    setProviders: async (val) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${TMDB_Key}`
        );
        const data = await res.json();
        const logo = data.results.filter(i => i.display_priorities[val])
        set({ providers: logo });
    },

    setDiscover: async (customParams = {}) => {
        const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
        const defaultParams = { include_adult: "false", language: "en-US", page: "1", sort_by: "popularity.desc" };

        const allParams = { ...defaultParams, ...customParams };
        const queryString = new URLSearchParams(allParams).toString();
        const url = `${BASE_URL}?${queryString}&api_key=${TMDB_Key}`
        const res = await fetch(url);
        const data = await res.json();

        console.log(url, data)
        set({ discover: data });
    },

    searches: [],
    clearSearches: () => set({
        searchData: {
            type: null,
            sort_by: "popularity.desc",
            watch_region: "IN",
            with_watch_providers: null,
            with_genres: null,
        },}),
        fetchSearches: async (type, query, page=1) => {
            const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_Key}&${query}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data)
            set({ searches: data.results, searchTotalPages: data.total_pages, })
        }

    }));

export default useNavStore;
