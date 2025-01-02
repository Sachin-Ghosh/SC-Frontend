import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Navbar';
import AppRoutes from './routes';


const App = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-[#f3e5d8]">
    
      <div className='relative z-40'>

      <Header />
      <main className="flex-grow">
        
        <Outlet />
      </main>
      </div>
      <AppRoutes/>
      {/* <Footer /> */}
    </div>
    </>
  );
};

export default App;

