import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, Navigate } from 'react-router-dom';
import { withApollo } from '@apollo/client/react/hoc';
import Navbar from './components/Navbar/Navbar';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP/PDP';
import CartPage from './pages/CartPage/CartPage';
import { readCategories } from './graphql/queries.utils';

const PLPWithClient = withApollo(PLP);
const PDPWithClient = withApollo(PDP);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }

  async componentDidMount() {
    const { client } = this.props;
    const response = await readCategories(client);
    this.setState({ categories: response.data.categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <>
        <Navbar categories={categories} />
        <Routes>
          {categories ? (
            <>
              <Route path="/" element={<Navigate replace to={categories[0].name} />} />
              {categories.map((category) => (
                <Route
                  path={category.name}
                  key={category.name}
                  element={(
                    <PLPWithClient categoryName={category.name} key={category.name} />
)}
                />
              ))}
            </>
          ) : (
            <></>
          )}
          <Route path="/:id" element={<PDPWithClient />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
