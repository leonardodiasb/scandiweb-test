import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { withApollo } from '@apollo/client/react/hoc';
import Navbar from './components/Navbar/Navbar';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP/PDP';

const NavbarWithClient = withApollo(Navbar);
const PLPWithClient = withApollo(PLP);
const PDPWithClient = withApollo(PDP);

function App() {
  return (
    <>
      <NavbarWithClient />
      <Routes>
        <Route path="/" element={<Navigate replace to="/all" />} />
        <Route path="/all" element={<PLPWithClient category="all" />} />
        <Route path="/clothes" element={<PLPWithClient category="clothes" />} />
        <Route path="/tech" element={<PLPWithClient category="tech" />} />
        <Route path="/:id" element={<PDPWithClient />} />
      </Routes>
    </>
  );
}

export default App;
