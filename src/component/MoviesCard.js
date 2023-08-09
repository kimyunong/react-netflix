import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';

const MoviesCard = ({item}) => {
    const { genres } = useSelector((state)=>state.movies.genres);
    const navigate = useNavigate();
    
    const showDetail= ()=>{
        navigate(`${item.id}`)
    }
  return (

    <div className='moviesBar' onClick={showDetail}>
    <div
        className='moviesCard'
    >
      <div className='movies-top'>
        <div>
        <Figure style={{float:'left',marginRight:'20px'}}>
        <Figure.Image
            width={53}
            height={80}
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
        />
        </Figure>
            <p className='movies-top-title'>{item.title}</p>
        </div>
      </div>
      
      <div className='movies-middle'>
        {item.genre_ids.map((id)=>( <Badge bg="danger">{genres.find(item=>item.id==id).name}</Badge> ))}
        <br></br><br></br>
        {item.overview}
      </div>

      <div className='movies-bottom'>
            <p>{item.vote_average}</p>&nbsp;
            <p>{item.popularity}</p>&nbsp;
            <p>{item.adult? (<span style={{color:"green"}}>ALL</span>) : (<span style={{color:"red"}}>under 18</span>)}</p>
      </div>
    </div>

    <div className='movies-img'
        style={{backgroundImage : "url("+`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item.backdrop_path}`+")"}}
      >
      </div>
    </div>
    
  )
}

export default MoviesCard
