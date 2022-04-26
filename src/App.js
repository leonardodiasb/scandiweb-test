import React from 'react';
import { Provider } from 'react-redux';
import { withApollo } from '@apollo/client/react/hoc';
import store from './redux/configureStore';
import Navbar from './components/Navbar/Navbar';

const NavbarWithClient = withApollo(Navbar);

function App() {
  return (
    <>
      <Provider store={store}>
        <NavbarWithClient />
      </Provider>
    </>
  );
}

export default App;
