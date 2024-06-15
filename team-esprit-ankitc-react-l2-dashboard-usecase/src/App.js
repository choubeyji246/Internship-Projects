import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/SideNavbar/Navbar/Navbar';
import { useState } from 'react';

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className='dashboard'>
   <Navbar openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
   <Dashboard openDrawer={openDrawer} />
   </div>
  );
}

export default App;
