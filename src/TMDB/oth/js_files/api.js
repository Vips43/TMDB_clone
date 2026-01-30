
const TMDB_Key = import.meta.env.VITE_TMDB_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;


export const duration = (runtime) => {
    if (!runtime) return "Runtime: N/A";

    const h = Math.floor(runtime / 60);
    const m = runtime % 60;

    return `${h ? `${h}h ` : ""}${m}m`;
};


const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();

    const fdata = data?.results?.filter(
        (m) => m.poster_path !== null && m.backdrop_path !== null);
    // console.log(fdata)

    return fdata;
}
export default movieAPI;

export const keywords = async (path) => {
    const res = await fetch(`https://api.themoviedb.org/3/${path}?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}
// keywords(66732)
export const videos = async (id, type) => {
    if (!id || !type) return;
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}
// videos(66732)
export const fetchReviews = async (id, type) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log("fetchReviews",data)
    return data.results;
}
// reviews(66732)

export const fetchCast = async (id, type, s = "credits") => {
    if (!id || !type || !s) return;
    
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/${s}?api_key=${TMDB_Key}`);
    const data = await res.json();

    const crew = data?.crew || [];

    const dir = crew.filter((c) => c.job === "Director")

    const topCrew = [...new Map(
        crew.map(({ name, job, id }) => [name, { name, job, id }])
    ).values()].slice(0, 3);

    // console.log(dir)
    return { data, dir, topCrew };
}
// fetchCast(1368166, 'movie', "credits")

export const fetchImages = async (id, type) => {
    if (!id || !type) return;

    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${TMDB_Key}`);
    const data = await res.json();
    // console.log("fetchImages " + " for " + type, data)
    return data;
}
export const fetchContentRating = async (id) => {
    if (!id) return { data: [] }
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log(data)
    return data;
}
export const fetchGlobal = async (type, id, value) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/${value}?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log(data)
    return data;
}


export const fetchCountries = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}
export const fetchDummy = async (val) => {
    const res = await fetch(`https://api.themoviedb.org/3/watch/providers/regions?api_key=${TMDB_Key}`)
    const data = await res.json();
    const filtered = data.results.find(i => i.iso_3166_1 === val)
    return filtered;
}

export const getFindById = async (external_id) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/find/${external_id}?external_source=imdb_id&api_key=${TMDB_Key}`);
        if (!res.ok) console.log("network", res.status)
        const data = await res.json();
        return data
    } catch (error) {
        console.error("error in findById", error)
        return data
    }
}
let cache = {};

export const getPersonFull = async (id) => {
    const key = `personFull_${id}`;

    if (cache[key]) {
        // console.log('returned from cached', cache[key])
        return cache[key];
    }

    const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_Key}&append_to_response=combined_credits`
    );
    const data = await res.json()


    cache[key] = data
    // console.log("perfull details", data, cache)

    return cache[key];
};

// getPersonFull(1498158)

export const getchTrailers = async (params) => {
    const res = params.map(param => {
        return param.key ==="topRated";
 
    })
    console.log(res)
}

export async function getIds(id){
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${TMDB_Key}
`)
const data = await res.json();
return data
}
