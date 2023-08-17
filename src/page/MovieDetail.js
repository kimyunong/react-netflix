import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, CloseButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { movieAction } from '../redux/action/movieAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons';
import YouTube from 'react-youtube';
import {faStar,faUsers} from "@fortawesome/free-solid-svg-icons";
import RelatedCard from '../component/RelatedCard';

const MovieDetail = () => {

  const {id}= useParams();
  const dispatch = useDispatch();
  const movies = useSelector((state)=>state.movies.movieDetail);
  const reviews = useSelector((state)=>state.movies.reviews);
  const videos = useSelector((state)=>state.movies.videos);
  const related = useSelector((state)=>state.movies.related);
  const [lineChange, setLineChange] = useState(0);
  const [show, setShow] = useState(false);
  const Close = () => setShow(false);

  console.log("related : ",related);

  const opts = {
    height: '1000',
    width: '1100',
    playerVars: {
      autoplay: 1
    },
  };

  const getMovieDetail=()=>{

    dispatch(movieAction.getMovieDetail(id))

  }

  const leftButton=()=>{
    console.log("레프트",lineChange)
    setLineChange(0);
  }

  const rightButton=()=>{
    console.log("라이트",setLineChange)
    setLineChange(1);
  }

  useEffect(()=>{

    getMovieDetail()

  },[lineChange])

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>

      <div style={{marginTop:'108px'}}>

      <Container>

        <Row>

          <Col className='Detail-left-box' lg={6}>
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movies?.poster_path}`}/>
          </Col>

          <Col className='Detail-right-box' lg={6}>

          <div style={{width:'90%'}}>

          <div style={{marginTop:'10px',display:'flex',flexWrap:'wrap'}}>
            {movies && movies.genres && movies.genres.map(item=><div className='genre-box'>{item.name}</div>)}
          </div>

          <div>
            <h1 style={{textTransform:'uppercase',fontWeight:'bold',marginBottom:'10px'}}>{movies.title}</h1>
            <h4 style={{fontWeight:'bold',marginBottom:'15px'}}>{movies.tagline}</h4>
          </div>

          <div className='Detail-right-box-3'>
            <p style={{fontWeight:'bold',marginRight:'12px'}}><FontAwesomeIcon style={{color:'rgb(255, 221, 0)'}} icon={faStar} /> {movies.vote_average}</p>&nbsp;
            <p style={{fontWeight:'bold',marginRight:'12px'}}><FontAwesomeIcon style={{color:'rgb(130, 130, 130)'}} icon={faUsers} /> {movies.popularity}</p>&nbsp;
            <p style={{fontWeight:'bold',marginRight:'12px'}}>{movies.adult? (<span style={{color:"green"}}>ALL</span>) : (<span style={{color:"red"}}>under 18</span>)}</p>
          </div>

          <div className='Detail-right-box-4'>
            <h6>{movies.overview}</h6>
          </div>

          <div className='Detail-right-box-5'>
            <div style={{display:'flex',alignItems:'center'}}>
              <p className='badge-box' style={{fontWeight:'bold'}}>Budget</p>&nbsp;
              <p>$ {movies.budget}</p>
            </div>
              
            <div style={{display:'flex',alignItems:'center'}}>
              <p className='badge-box' style={{fontWeight:'bold'}}>Revenue</p>&nbsp;
              <p>$ {movies.revenue}</p>
            </div>

            <div style={{display:'flex',alignItems:'center'}}>
              <p className='badge-box' style={{fontWeight:'bold'}}>Release_Day</p>&nbsp;
              <p>{movies.release_date}</p>
            </div>

            <div style={{display:'flex',alignItems:'center'}}>
              <p className='badge-box' style={{fontWeight:'bold'}}>Time</p>&nbsp;
              <p>{movies.runtime}</p>
            </div>
          </div>

          <div className='Detail-right-box-6'>

            <div style={{fontWeight:'bold'}}>Trailer</div>&nbsp;&nbsp;

            <div>
              <FontAwesomeIcon icon={faYoutube} fade style={{color:"#f9b624",fontSize:"40px",cursor:"pointer"}}
              onClick={() => setShow(true)}
              />

                  <Modal
                      show={show}
                      onHide={() => setShow(false)}
                      dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                      size='xl'
                      centered
                    >
                      <Modal.Header className='modalBackground'>
                        <Modal.Title id="example-custom-modal-styling-title">
                        Trailer
                        </Modal.Title>
                        <CloseButton variant="white" onClick={Close}/>
                      </Modal.Header>
                      <Modal.Body className='modalBackground'>
                        <p>
                        <YouTube videoId={videos && videos.results && videos.results.length > 0 && videos.results[0].key} opts={opts}/>
                        </p>
                      </Modal.Body>
                    </Modal>

              </div>
              </div>
            </div>
          </Col>

        </Row>

        <br></br>
        <br></br>

        <Row style={{justifyContent:'center'}}>

          <div style={{width:'95%'}}>

            <div className='ChangeButton'>

              <div className='radioButton'>
                <input type='radio' id='re' name='radio-button' onClick={leftButton} />
                <label for='re'>REVIEWS</label>
              </div>&nbsp;

              <div className='radioButton'>
                <input type='radio' id='ra' name='radio-button' onClick={rightButton} />
                <label for='ra'>RELATED MOVIES</label>
              </div>

            </div>
            <br></br>
            <br></br>
            {lineChange?
            (<div>
              <Row>
                
                {related.results.map((item) =>(<Col lg={6}><RelatedCard item={item}/></Col>))}
                  
              </Row> 
              </div>) : 
              (<div>
              {reviews && reviews.results && reviews.results.map((item)=>
              <div>
              <p>
              <FontAwesomeIcon style={{fontSize:'18px',color:'yellow'}} icon={faGithub} />&nbsp;
              {item.author}
              </p>
              <p>{item.content}</p>
              </div>
              )}
            </div>)

            }
              
          </div>
          
        </Row>

      </Container>

      </div>
      
    </div>
  )

}

export default MovieDetail
