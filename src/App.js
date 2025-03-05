import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import PropertiesList from './features/properties/PropertiesList';
import ResidentsList from './features/residents/ResidentsList';
import UsersList from './features/users/UsersList';
import FineTypesList from './features/fineTypes/FineTypesList';
import ExpensesList from './features/expenses/ExpensesList';

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
        <Route path='users'>
          <Route index element={<UsersList />} />
        </Route>
        <Route path='finetypes'>
          <Route index element={<FineTypesList />} />
        </Route>
        <Route path='expenses'>
          <Route index element={<ExpensesList />} />
        </Route>
        </Route>
        
      </Route>
      
    </Routes>
  );
}

export default App;
