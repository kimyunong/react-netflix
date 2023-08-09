import { createSlice } from "@reduxjs/toolkit";

let initialState= {

popularMovies : {},
topRatedMovies : {},
upcomingMovies : {},
genres : [],
loading : true,
movieDetail : [],
reviews : [],
videos : {},
searchMovies : {},
related : []
}

const movieSlice = createSlice({

    name : "movies",
    initialState,

    reducers : {

        getMovies(state,action){

            state.loading=action.payload.loading
            state.popularMovies=action.payload.popularMovies
            state.topRatedMovies=action.payload.topRatedMovies
            state.upcomingMovies=action.payload.upcomingMovies
            state.genres=action.payload.genres
            state.searchMovies=action.payload.searchMovies
            state.loading=false

        },

        getMovieDetail(state,action){

            state.movieDetail=action.payload.MovieDetails
            state.genres=action.payload.genres
            state.reviews=action.payload.reviews
            state.videos=action.payload.videos
            state.related=action.payload.related
            state.loading=false

        },

        resetSearch(state,action){
            state.searchMovies.page = 0;
            state.searchMovies.total_pages = 0;
            state.searchMovies.total_results = 0;
            state.searchMovies.results = [];
        }
    }

})


export const movieActions = movieSlice.actions
export default movieSlice.reducer;