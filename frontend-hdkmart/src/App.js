import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ClientRouter from './router/ClientRouter';
import AdminRouter from './router/AdminRouter';

const App = () => {
  return (
    <BrowserRouter>
      <main className='py-0'>
        <Routes>
          <Route path='/*' element={<ClientRouter />} />
          <Route path='/admin/*' element={<AdminRouter />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
