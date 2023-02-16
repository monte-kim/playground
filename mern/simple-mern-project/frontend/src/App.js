import { Routes, Route, Navigate } from 'react-router-dom';
import NewPlaces from './Places/pages/Places';
import Users from './Users/pages/Users';
import MainNavigation from './shared/Navigation/MainNavigation';

function App() {
  return (
    <>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/places/new' element={<NewPlaces />}></Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
