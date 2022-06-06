/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withApollo } from '@apollo/client/react/hoc';
import store from '../../redux/configureStore';
import ProductCard from '../../components/ProductCard/ProductCard';
import './PLP.css';
import fetchCategory from '../../redux/actions/categories.action';
import { readCategory } from '../../graphql/queries.utils';

const ProductCardWithApollo = withApollo(ProductCard);

class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    const { categories, categoryName } = this.props;
    const categoryFiltered = categories.filter((category) => category.name === categoryName);
    if (!categoryFiltered.length) {
      const { client } = this.props;
      const response = await readCategory(client, categoryName);
      store.dispatch(fetchCategory(response.data.category));
    }
  }

  render() {
    const { currency, categories, categoryName } = this.props;
    const category = categories.filter((cat) => cat.name === categoryName);
    if (category.length) {
      const { products } = category[0];
      return (
        <div className="category-container">
          <h1 className="category-name">{categoryName}</h1>
          <div className="products-container">
            {products.map((product) => (
              <Link
                to={`/${product.id}`}
                key={product.id}
                state={{ id: `${product.id}` }}
              >
                <ProductCardWithApollo
                  key={product.id}
                  product={product}
                  currency={currency.symbol}
                />
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return (
      <></>
    );
  }
}

PLP.propTypes = {
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  currency: PropTypes.objectOf(PropTypes.any).isRequired,
  categoryName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(PLP);
