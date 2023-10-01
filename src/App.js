import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, CreatePost } from './pages';
import { logo } from './assets';

const renderLinks = () => {
  return (
    <>
      <Link to='/'>
        <img
          src={logo}
          alt='logo'
          className='w-28 object-contain'
        />
      </Link>
      <Link
        to='create-post'
        className='btn-primary'
      >
        Create
      </Link>
    </>
  );
};

const renderRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/create-post'
          element={<CreatePost />}
        />
      </Routes>
    </>
  );
};

const renderHeader = () => {
  return (
    <header className='w-full flex justify-between items-center bg-white border-b border-b-[#e6ebf4] sm:px-8 px-4 py-4'>
      {renderLinks()}
    </header>
  );
};

const renderMainContent = () => {
  return (
    <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
      {renderRoutes()}
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      {renderHeader()}
      {renderMainContent()}
    </BrowserRouter>
  );
};

export default App;
