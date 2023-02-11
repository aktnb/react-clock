import { Routes, Route, Navigate } from 'react-router-dom';
import SettingPage from './pages/SettingPage';
import ViewPage from './pages/ViewPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SettingPage></SettingPage>}/>
      <Route path='/view/' element={<ViewPage></ViewPage>}/>
      <Route path='*' element={<Navigate replace to='/'/>}/>
    </Routes>
  );
};

export default App;