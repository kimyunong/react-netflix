import React, { useState } from 'react';
import { Container,Button,Form,Navbar,Nav} from 'react-bootstrap';
import { Link, useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { movieAction } from '../redux/action/movieAction';

const Navigation = ({changeFunc}) => {

  const [searchQuery,setSearchQuery] = useState("");
  const [page] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e)=>{
    setSearchQuery(e.target.value); 
  }

  const handleFromSubmit = (e)=>{
    
    e.preventDefault();    

    if(searchQuery!==""){
      dispatch(movieAction.getMovies(searchQuery,page))
      navigate(`/movies?q=${searchQuery}`)
    }else{
      setSearchQuery("");
      dispatch(movieAction.getMovies("",page))
      navigate(`/movies`)
    }
      
  }
  
  changeFunc(setSearchQuery);

  return (

    <div className='nav-box'>
     <Navbar style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} variant="dark" expand="lg">
      <Container fluid>

        <Navbar.Brand href="#">
            <img style={{borderRadius:'10px'}} width={140} src='https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png'/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className='nav-item'>Home</Link>

            <Link to="/movies" className='nav-item'>Movies</Link>
           
          </Nav>

          <Form className="d-flex" onSubmit={handleFromSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />

            <Button variant="outline-danger" type="submit"><FontAwesomeIcon icon={faSearch} /></Button>
          </Form>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    
  )
}

export default Navigation
