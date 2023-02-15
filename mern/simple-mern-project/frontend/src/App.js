import { Routes, Route, Navigate } from 'react-router-dom';
import NewPlaces from './Places/pages/Places';
import Users from './Users/pages/Users';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Users />}></Route>
      <Route path='/places/new' element={<NewPlaces />}></Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
