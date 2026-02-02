
export const userNav = [
    { label: "Overview", type: ["Main", "favorites", "Recommendation"] }, { label: "List", },
    {
        label: "Rating",
        type: [{ label: "Movies", text: "rated", key: "movie" }, { label: "Tv-Show", text: "rated", key: 'tv' }]
    },
    {
        label: "Favorite",
        type: [{ label: "Movies", text: "favorite", key: "movie" }, { label: "Tv-Show", text: "favorite", key: 'tv' }]
    },
    {
        label: "Watchlist",
        type: [{ label: "Movies", text: "watchlist", key: "movie" }, { label: "Tv-Show", text: "watchlist", key: 'tv' }]
    }
]


