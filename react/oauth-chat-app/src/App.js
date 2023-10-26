import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import KakaoLogin from './Kakao/KakaoLogin';
import KakaoLoginCallback from './Kakao/KakaoLoginCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div className='App'>
              <h1>Hello, World!</h1>
              <KakaoLogin />
            </div>
          }
        />
        <Route path='/auth/kakao' element={<KakaoLoginCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
