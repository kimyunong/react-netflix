import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilm, faStar} from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({item}) => {
  
  const { genres } = useSelector((state)=>state.movies.genres);

  const navigate = useNavigate();

  const showDetail= ()=>{

    navigate(`movies/${item.id}`)

  }

  return (

    <div
    className='Card' onClick={showDetail}
    style={{backgroundImage : "url("+`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item.poster_path}`+")"}}>
      
      <div className='overlay'>

        <div className='card-overlay' style={{marginTop:'11%'}}>
            <span style={{fontSize:'28px'}}>&nbsp;{item.title}</span>
          </div>
        <br></br>
        
        <div className='card-overlay'>
          &nbsp;&nbsp;{item.genre_ids.map((id)=>( <div className='badge'>{genres.find(item=>item.id==id).name}</div> ))}
        </div>
        <br></br>
        
        <div className='card-overlay' style={{fontSize:'18px',marginBottom:'3%',marginRight:'100%',position:'absolute'}}>
          <span><FontAwesomeIcon style={{color:'rgb(255, 221, 0)'}} icon={faStar} /> <font style={{color:'rgb(223, 223, 223)'}}>{item.vote_average}</font></span>
          <span>&nbsp;&nbsp;{item.adult? 
          (<span style={{color:"green"}}>ALL</span>) 
          : 
          (<span style={{color:"red"}}><FontAwesomeIcon icon={faFilm}/> under 18</span>)}</span>
        </div>
      </div>
    
    </div>

  )
}

export default MovieCard
