
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

/**************************** Component imports ****************************************************** */
import Navbar from './components/navbar';

/**************************** Page imports *********************************************************** */
import LandingPage from './pages/landing-page';
import Uploader from './pages/uploader';
import VisualLauncher from './pages/visual-launcher';
import NotFound from './pages/not-found';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <div className='mt-12 w-full'>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="upload" element={<Uploader />} />
            <Route path="explore" element={<VisualLauncher layerId={0}/>} />
            <Route path="compare" element={<VisualLauncher layerId={1}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
