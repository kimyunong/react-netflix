import api from "../api";
import { movieActions } from "../reducers/movieReducer";

const API_KEY=process.env.REACT_APP_API_KEY;

function getMovies(searchQuery,page){

    console.log("서치",searchQuery,"페이지",page);

    return async(dispatch)=>{

        try{

        const popularMovieApi=api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)

        const TopRatedMovieApi=api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)

        const UpcomingMovieApi=api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)

        const genreApi=api.get(`/genre/movie/list?api_key=${API_KEY}&language=en`)

        const searchApi=api.get(`/search/movie?query=${searchQuery}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`)

        let [ popularMovies,topRatedMovies,upcomingMovies,genres,searchMovies ] = await Promise.all( [ popularMovieApi,TopRatedMovieApi,UpcomingMovieApi,genreApi,searchApi ] )


        dispatch( movieActions.getMovies({
            loading : true,
            popularMovies: popularMovies.data, 
            topRatedMovies: topRatedMovies.data, 
            upcomingMovies: upcomingMovies.data,
            genres : genres.data,
            searchMovies : searchMovies.data
        }) )
            
        }catch(error){
            // 에러 핸들링
        }
 
    }    
}

function getMovieDetail(id){

    return async(dispatch)=>{

        try{

            const MovieDetailApi=api.get(`/movie/${id}?api_key=${API_KEY}&language=en`)

            const genreApi=api.get(`/genre/movie/list?api_key=${API_KEY}&language=en`)

            const reviewsApi=api.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en`)

            const videosApi=api.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)

            const relatedApi=api.get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
    
            let [ MovieDetails,genres,reviews,videos,related ] = await Promise.all( [ MovieDetailApi,genreApi,reviewsApi,videosApi,relatedApi ] )
    
            console.log("데이터만 불러",reviews.data);
    
            dispatch( movieActions.getMovieDetail({
                loading : true,
                MovieDetails : MovieDetails.data,
                reviews : reviews.data,
                genres : genres.data,
                videos : videos.data,
                related : related.data
            }) )
                
            }catch(error){
                // 에러 핸들링
            }

    }

}

export const movieAction = {
    getMovies,getMovieDetail
}