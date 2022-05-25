import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import store from '../../redux/configureStore';
import fetchCategories from '../../redux/actions/categories.action';
import ProductCard from '../../components/ProductCard/ProductCard';

class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
    };
  }

  async componentDidMount() {
    const { categories } = this.props;
    if (!categories) {
      const { client } = this.props;
      const response = await client.query({
        query: gql`
        query ReadCategories {
          categories {
            name,
            products {
              id,
              name,
              inStock,
              gallery,
              prices {
                currency{
                  label,
                  symbol
                },
                amount
              }
            }
          }
        }`,
      });
      // this.setState({ categories: response.data });
      store.dispatch(fetchCategories(response.data.categories));
    }
  }

  render() {
    const { category, categories, currency } = this.props;
    if (categories) {
      const cat = categories.filter((cat) => cat.name === category);
      const { products } = cat[0];
      return (
        <div>
          <h1>{category}</h1>
          <div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} currency={currency.symbol} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        No products
      </div>
    );
  }
}

PLP.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.arrayOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  currency: PropTypes.objectOf(PropTypes.any).isRequired,
  category: PropTypes.string.isRequired,
};

PLP.defaultProps = {
  categories: null,
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(PLP);
