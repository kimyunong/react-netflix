import React, { useEffect } from 'react';
import { movieAction } from '../redux/action/movieAction';
import { useDispatch,useSelector } from 'react-redux';
import Banner from '../component/Banner';


import MovieSlide from '../component/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader"; // 로딩 스피너

const Home = () => {

const {popularMovies,topRatedMovies,upcomingMovies,loading} = useSelector((state)=>state.movies);
const page = 1;
const searchQuery = "";
const dispatch = useDispatch();    

    useEffect(()=>{

        dispatch(movieAction.getMovies(searchQuery,page))

    },[])

    if(loading){ 
      
      return (
        <div className='spinner-box'>
          <ClipLoader color="tomato" loading={loading} size={150}/>
        </div>
      )
    }

    return (
      <div>
        { <Banner Movie={popularMovies.results[0]}/> }
        <br></br>
        <p className='slide-title'>&nbsp;Popular Movies</p>
        <MovieSlide Movies={popularMovies}/>
        <p className='slide-title'>&nbsp;Top rated Movies</p>
        <MovieSlide Movies={topRatedMovies}/>
        <p className='slide-title'>&nbsp;Upcoming Movies</p>
        <MovieSlide Movies={upcomingMovies}/>
      </div>
    )
}

export default Home


