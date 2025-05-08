import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home';
import Movies from './page/Movies';
import MovieDetail from './page/MovieDetail';
import Navigation from './component/Navigation';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div id='app-box'>
      <Navigation changeFunc={setQueryF}/>
      
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies resetQuery={resetQuery}/>}/>
        <Route path='/movies/:id' element={<MovieDetail/>}/>

      </Routes>

    </div>
  );
}

let queryF = () => {}

function setQueryF(f) {
  queryF = f;
}

function resetQuery() {
  console.log('reset');
  queryF("");
}

export default App;
