import { Routes, Route, Navigate } from 'react-router-dom';
import NewPlaces from './Places/pages/NewPlaces';
import Users from './Users/pages/Users';
import MainNavigation from './shared/Navigation/MainNavigation';
import UserPlaces from './Places/pages/UserPlaces';

function App() {
  return (
    <>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/:uid/places' element={<UserPlaces />}></Route>
          <Route path='/places/new' element={<NewPlaces />}></Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
