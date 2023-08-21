import React from 'react';
import { useSelector } from 'react-redux';

const Banner = ({Movie}) => {

  const videos = useSelector((state)=>state.movies.videos);

  const opts = {
    height: '1000',
    width: '1100',
    playerVars: {
      autoplay: 1
    },
  };

  return (

    <div className='Banner' style={{backgroundImage : "url("+ `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${Movie.poster_path}`+")"}}>
      <div className='Banner-info'>
        <h1 style={{fontWeight:'bold',color:'#eaeaea'}}>{Movie.title}</h1>
        <br/>
        <p style={{fontWeight:'bold',color:'#eaeaea'}}>{Movie.overview}</p>
      </div>
    </div>
    
  )
}

export default Banner
