import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { withApollo } from '@apollo/client/react/hoc';
import store from './redux/configureStore';
import Navbar from './components/Navbar/Navbar';
import PLP from './pages/PLP';

const NavbarWithClient = withApollo(Navbar);

function App() {
  return (
    <>
      <Provider store={store}>
        <NavbarWithClient />
        <Routes>
          <Route path="/all" element={<PLP />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
