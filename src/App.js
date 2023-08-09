import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home';
import Movies from './page/Movies';
import MovieDetail from './page/MovieDetail';
import Navigation from './component/Navigation';
import { Route, Routes } from 'react-router-dom';

// 1. 3개 페이지 필요 ( 홈 , 무비, 디테일 ) // end
// 2. 홈페이지에서 배너를 볼 수 있다 // end
// 3. 3가지 섹션의 영화를 볼 수 있다 ( popular, top rated, upComing ) // end
// 4. 각 영화에 마우스를 올려두면, 제목, 장르, 점수, 인기도, 청불여부 // end
// 5. 영화를 슬라이드로 넘기면서 볼 수 있다 // end

// 6. 영화 디테일 페이지에서 영화에 대한 디테일한 정보를 볼 수 있다 ( 포스터, 제목, 줄거리, 점수, 인기도 등)  // end 
// 7. trailer를 누르면 trailer를 볼 수 있다 // end
// 8. 영화에 리뷰도 볼 수 있다 // end
// 9. 관련된 영화도 볼 수 있다 // end

// 10. 영화 페이지 네이션 // end
// 11. 영화 검색을 할 수 있다 // end
// 12. 영화 리스트 순 으로 정렬할 수 있다 // end
// 12. 영화 평점 별 정렬 할 수 있다 // end 
// 13. 영화를 장르별 필터링 할 수 있다 // end 


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
