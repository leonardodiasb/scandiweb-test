import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { withApollo } from '@apollo/client/react/hoc';
import Navbar from './components/Navbar/Navbar';
import PLP from './pages/PLP';

const NavbarWithClient = withApollo(Navbar);

function App() {
  return (
    <>
      <NavbarWithClient />
      <Routes>
        <Route path="/all" element={<PLP />} />
      </Routes>
    </>
  );
}

export default App;
