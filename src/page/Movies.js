import { Col, Container, Row } from 'react-bootstrap';
import MoviesCard from '../component/MoviesCard';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { movieAction } from '../redux/action/movieAction';
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { movieActions } from "../redux/reducers/movieReducer";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Movies = ({resetQuery}) => {

  const { popularMovies,topRatedMovies,upcomingMovies,searchMovies } = useSelector((state)=>state.movies);
  const { genres } = useSelector((state)=>state.movies.genres);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ query, setSearchQuery ] = useSearchParams();
  const [ menutext, setMenutext]= useState('');
  const [ menuList,setMenuList ] = useState(popularMovies);
  const [ filteredMovies,setFilteredMovies ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = Boolean(anchorEl);
  
  const [ value, setValue ] = useState([ 0, 10 ]);
  const [ minValue, maxValue ] = value;
  const [ selectedGenre,setSelectedGenre ] = useState(0);

  const dispatch = useDispatch();

  console.log("필터 :",filteredMovies);

  const handleGenreClick = (genreId)=>{
    resetAllQuery();
    setSelectedGenre(genreId);
  }

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  let searchQuery=query.get('q')||"";

  const resetAllQuery = () => {
    setSearchQuery("");
    resetQuery();
    dispatch(movieActions.resetSearch())
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    resetAllQuery();
    setMenutext('popular')
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    resetAllQuery();
    setMenutext('topRated')
    setAnchorEl(null);
  };
  const handleClose3 = () => {
    resetAllQuery();
    setMenutext('upcoming')
    setAnchorEl(null);
  };

  const showFilter = ()=>{
    setIsOpen(!isOpen);
  }
  

  console.log("무비페이지",popularMovies,topRatedMovies,upcomingMovies);
  console.log("서치페이지",searchMovies);
  console.log("쿼리 :",searchQuery);
  console.log("페이지",page,"총페이지",totalPages);
  console.log("메뉴텍스트",menutext);
  console.log("장르",genres);


  useEffect(()=>{
  
    if(menutext ==='popular'){
      if(searchQuery!==""){
        setPage(searchMovies.page)
        setTotalPages(searchMovies.total_pages)
      }else{
        setMenuList(popularMovies)
        setPage(popularMovies.page)
        setTotalPages(popularMovies.total_pages)}
    }else if(menutext ==='topRated'){
      if(searchQuery!==""){
        setPage(searchMovies.page)
        setTotalPages(searchMovies.total_pages)
        }else{
        setMenuList(topRatedMovies)
        setPage(topRatedMovies.page)
        setTotalPages(topRatedMovies.total_pages)}
    }else if(menutext ==='upcoming'){
      if(searchQuery!==""){
        setPage(searchMovies.page)
        setTotalPages(searchMovies.total_pages)
        }else{
        setMenuList(upcomingMovies)
        setPage(upcomingMovies.page)
        setTotalPages(upcomingMovies.total_pages)}
    }else{
      if(searchQuery!==""){
        setPage(searchMovies.page)
        setTotalPages(searchMovies.total_pages)
      }else{
        setMenuList(popularMovies)
        setPage(popularMovies.page)
        setTotalPages(popularMovies.total_pages)
      }
    }

    
      const filteredResults = menuList.results.filter((item) => {
        const rangeNum = Math.floor(item.vote_average);
        const genreNum = item.genre_ids.includes(selectedGenre);
        console.log("레인지넘버 : ",rangeNum);

        if(selectedGenre ==0){
          return rangeNum >= minValue && rangeNum <= maxValue;
        }else{
          return rangeNum >= minValue && rangeNum <= maxValue && genreNum;
        }
        });
      
      setFilteredMovies(filteredResults);

  },[query,searchMovies.total_pages,menutext,topRatedMovies.page,popularMovies.page,upcomingMovies.page,minValue, maxValue, selectedGenre, menuList])
       
  const handlePageChange = (page) => {
        setPage(page);
        dispatch(movieAction.getMovies(searchQuery,page))
      };

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>

      <div style={{marginTop:'108px'}}>
        <Container>
          <Row>

            <Col lg={4}>

              <div className='leftMenuBar'>
                
                <div style={{ width: '100%', marginTop: '10px'}}>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      Movie_List
                    </Button>
                  
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                      'aria-labelledby':'basic-button',
                    }}
                    >
                    <Paper Paper sx={{ width :415 }}></Paper>
                      <MenuItem onClick={handleClose}>popularMovies</MenuItem>
                      <MenuItem onClick={handleClose2}>top_ratedMovies</MenuItem>
                      <MenuItem onClick={handleClose3}>upcomingMovies</MenuItem>
                    </Menu>
                </div>

                <div style={{ width: '100%',marginTop: '10px' }}>
                    <Button id="basic-button2" onClick={showFilter}>filter_List</Button>
                    
                    {isOpen && (
                      <div id='genres-info' className='left-bottom-bar'>
                    
                        <div className='left-bottom-box'>
                          
                          <div style={{width:'100%'}}>
                            <h5 style={{textAlign:'center'}}>IBM SCORE FILTER</h5>
                            <p style={{textAlign:'center'}}>From : <span className='score-num'>{minValue}</span> - To : <span className='score-num'>{maxValue}</span></p>
                          </div>
                          
                          <div style={{width:'100%'}}>
                            <Box sx={{ width: '90%',marginLeft:'5%' }}>
                                <Slider
                                  getAriaLabel={() => 'Temperature range'}
                                  value={value}
                                  min={0}
                                  max={10}
                                  onChange={handleChange}
                                  valueLabelDisplay="auto"
                                />
                            </Box>
                          </div>
                      
                      <br></br>
                        
                      </div>

                      <div className='left-bottom-box'>
                        <div style={{width:'100%'}}>
                          <h5 style={{textAlign:'center'}}>GENRES</h5>
                          <br></br>
                        </div>
                        
                        <div style={{width:'100%'}}>
                          {genres.map((item)=>
                          <Button 
                            id="genres-button" 
                            variant="outlined"
                            onClick={()=> handleGenreClick(item.id)}
                          >{item.name}
                          </Button>)}
                        </div>
                      </div>
                      </div>
                    )}             
                </div>

              </div>

            </Col>

            <Col lg={8}>
              <div>
                <Row>
                  {searchMovies.results != undefined && searchMovies.results.length !== 0 ?

                  (searchMovies.results.map((item) => <Col lg={6}><MoviesCard item={item}/></Col>)) 
                  :  
                  (filteredMovies.map((item) => <Col lg={6}><MoviesCard item={item} /></Col>))
                  
                  }
                </Row>  
              </div>

              <div>
              <Pagination
                  activePage={page}
                  itemsCountPerPage={1}
                  totalItemsCount={totalPages}
                  pageRangeDisplayed={5}
                  prevPageText={"‹"}
                  nextPageText={"›"}
                  onChange={handlePageChange}
              />
              </div>
            </Col>

          </Row>
        </Container>
      </div>
      
    </div>
  )
}

export default Movies
