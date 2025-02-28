import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import PropertiesList from './features/properties/PropertiesList';
import ResidentsList from './features/residents/ResidentsList';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />} >
        <Route index element={<Welcome />} />
        <Route path='properties'>
          <Route index element={<PropertiesList /> } />
        </Route>
        <Route path='residents'>
          <Route index element={<ResidentsList />} />
        </Route>
        </Route>
      </Route>
      
    </Routes>
  );
}

export default App;
