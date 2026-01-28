import { create } from "zustand";
import { fetchGlobal } from "./api.js"

const TMDB_Key = import.meta.env.VITE_TMDB_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;

const useApiStore = create((set, get) => ({
  /* ================= STATE ================= */

  popular: [],
  topRated: [],
  trending: [],
  movieDetail: [],
  tvDetail: [],
  casts: [],
  searchResults: [],
  globalData: [],

  loadingPopular: false,
  loadingTopRated: false,
  loadingTrending: false,
  movieLoading: false,
  tvLoading: false,
  isLoading: false,

  toggle: false,
  searchtype: "movie",

  directorInfo: { name: "", jobs: "", topCrew: [] },

  err: null,
  query: null,

  /* ================= CACHE ================= */

  cache: {},

  /* ================= SETTERS ================= */

  setToggle: () => set({ toggle: true }),
  setDirectorInfo: (payload) => set({ directorInfo: payload }),
  setSearchType: (type) => set({ searchtype: type }),
  setQuery: (q) => set({ query: q }),

  /* ================= SEARCH ================= */

  searchMovie: async (q, type) => {
    const key = `search_${type}_${q}`;
    const cached = get().cache[key];

    if (cached) {
      set({ searchResults: cached, err: null });
      return;
    }
    set({ isLoading: true });
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${type}?query=${q}&api_key=${TMDB_Key}`
      );
      const data = await res.json();
      set((state) => ({
        searchResults: data,
        isLoading: false,
        err: null,
        cache: { ...state.cache, [key]: data },
      }));
    } catch (error) {
      set({ isLoading: false, err: error });
    }
  },

  /* ================= POPULAR ================= */

  fetchPopular: async (type, status) => {
    if (get().loadingPopular) return;

    const key = `popular_${type}_${status}`;
    const cached = get().cache[key];

    if (cached) {
      set({ popular: cached });
      return;
    }
    try {
      set({ loadingPopular: true });

      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${status}?api_key=${TMDB_Key}`
      );
      const data = await res.json();
      const filtered =
        data?.results?.filter(
          (m) => m.poster_path && m.backdrop_path
        ) || [];
      set((state) => ({
        popular: filtered,
        loadingPopular: false,
        cache: { ...state.cache, [key]: filtered },
      }));
    } catch (err) {
      set({ loadingPopular: false, err });
    }
  },

  /* ================= TOP RATED ================= */

  fetchTopRated: async (type) => {
    if (get().loadingTopRated) return;
    const key = `topRated_${type}`;
    const cached = get().cache[key];

    if (cached) {
      set({ topRated: cached });
      return;
    }

    try {
      set({ loadingTopRated: true });

      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/top_rated?api_key=${TMDB_Key}`
      );
      const data = await res.json();

      const filtered =
        data?.results?.filter(
          (m) => m.poster_path && m.backdrop_path
        ) || [];

      set((state) => ({
        topRated: filtered,
        loadingTopRated: false,
        cache: { ...state.cache, [key]: filtered },
      }));
    } catch (err) {
      set({ loadingTopRated: false, err });
    }
  },

  /* ================= TRENDING ================= */

  fetchTrending: async (time = "day") => {
    if (get().loadingTrending) return;

    const key = `trending_${time}`;
    const cached = get().cache[key];

    if (cached) {
      set({ trending: cached });
      return;
    }

    try {
      set({ loadingTrending: true });

      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/${time}?api_key=${TMDB_Key}&language=en-IN`
      );
      const data = await res.json();

      const filtered =
        data?.results?.filter(
          (m) => m.poster_path && m.backdrop_path
        ) || [];

      set((state) => ({
        trending: filtered,
        loadingTrending: false,
        cache: { ...state.cache, [key]: filtered },
      }));
    } catch (err) {
      set({ loadingTrending: false, err });
    }
  },

  /* ================= MOVIE / TV DETAIL ================= */

  setMovieDetail: async (id, type = "movie") => {
    if (!id) return;

    const key = `detail_${type}_${id}`;
    const cached = get().cache[key];

    if (cached) {
      set({ [type === "tv" ? "tvDetail" : "movieDetail"]: cached });
      return;
    }

    set({ [type === "tv" ? "tvLoading" : "movieLoading"]: true, });
    try {
      const endpoint =
        type === "tv"
          ? `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_Key}`
          : `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_Key}&language=en-US`;
      console.log(type, endpoint)
      const res = await fetch(endpoint);
      const data = await res.json();
      // console.log(data)
      set((state) => ({
        [type === "tv" ? "tvDetail" : "movieDetail"]: data,
        [type === "tv" ? "tvLoading" : "movieLoading"]: false,
        err: null,
        cache: { ...state.cache, [key]: data },
      }));
    } catch (err) {
      set({ detailLoading: false, err });
    }
  },

  /* ================= CAST ================= */

  setCasts: async (id, type) => {
    const key = `casts_${type}_${id}`;
    const cached = get().cache[key];

    if (cached) {
      set({ casts: cached });
      return;
    }

    set({ isLoading: true });

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/aggregate_credits?api_key=${TMDB_Key}&language=en-US`
      );
      const data = await res.json();

      set((state) => ({
        casts: data,
        isLoading: false,
        err: null,
        cache: { ...state.cache, [key]: data },
      }));
    } catch (error) {
      set({ isLoading: false, err: error });
    }
  },
  fetchGlobalAPI: async (type, key, page = 1) => {
    set({ isLoading: true })
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${key}?api_key=${TMDB_Key}&page=${page}`);
    const data = await res.json();
    set({ globalData: data, isLoading: false })
  },


  trailers: [],
  trLoading: false,

  fetchTrailers: async () => {
    const trending = get().trending;

    if (!trending || trending.length === 0) return;

    // Prevent double fetch
    if (get().trLoading) return;

    set({ trLoading: true });

    try {
      const newData = trending.map((p) => ({
        id: p.id,
        type: p.media_type || (p.first_air_date ? "tv" : "movie"),
      }));

      const videos = newData.map((n) =>
        fetchGlobal(n.type, n.id, "videos")
      );

      const allvideos = await Promise.all(videos);

      const data = allvideos
        .map((a) => a?.results?.[0])
        .filter(Boolean);

      set({ trailers: data, trLoading: false });
    } catch (error) {
      console.error("Trailer fetch error:", error);
      set({ trLoading: false });
    }
  },

}));


export default useApiStore;





