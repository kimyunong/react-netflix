import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilm, faStar} from "@fortawesome/free-solid-svg-icons";


const RelatedCard = ({item}) => {

  const { genres } = useSelector((state)=>state.movies.genres);
    
  return (
    <div className='RelatedCard'
          style={{backgroundImage : "url("+`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item.poster_path}`+")"}}
    >
      
      <div className='RelatedCard-overlay'>

        <div className='RelatedCard-overlay-box'>
            <span style={{fontSize:'33px',marginTop:'130px'}}>&nbsp;{item.title}</span>
          </div>
        <br></br>
        
        <div className='RelatedCard-overlay-box'>
          &nbsp;&nbsp;{item.genre_ids.map((id)=>( <div className='badge'>{genres.find(item=>item.id==id).name}</div> ))}
        </div>
        <br></br>
        
        <div className='RelatedCard-overlay-box' style={{fontSize:'20px',marginBottom:'3%',position:'absolute'}}>
          <span>&nbsp;&nbsp;<FontAwesomeIcon style={{color:'rgb(255, 221, 0)'}} icon={faStar} /> <font style={{color:'rgb(223, 223, 223)'}}>{item.vote_average}</font></span>
          <span>&nbsp;&nbsp;{item.adult? 
          (<span style={{color:"green"}}>ALL</span>) 
          : 
          (<span style={{color:"red"}}><FontAwesomeIcon icon={faFilm}/> under 18</span>)}</span>
        </div>
        
      </div>
    </div>
  )
}

export default RelatedCard
