import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import withRouter from '../../hoc/withRouter';
import './PDP.css';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import store from '../../redux/configureStore';
import addProduct from '../../redux/actions/products.action';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  async componentDidMount() {
    const { location, products } = this.props;
    const { id } = location.state;
    const product = products.filter((product) => product.id === id);
    if (product.length) {
      this.setState({ product: product[0] });
    } else {
      const { client } = this.props;
      const response = await client.query({
        query: gql`
        query ReadCategories {
          product(id: "${id}") {
            id,
            name,
            inStock,
            gallery,
            description,
            category,
            attributes {
              id,
              name,
              type,
              items {
                displayValue,
                value,
                id
              }
            },
            prices {
              currency {
                label,
                symbol,
              },
              amount,
            },
            brand
          }
        }`,
      });
      store.dispatch(addProduct(response.data.product));
      this.setState({ product: response.data.product });
    }
  }

  render() {
    const { product } = this.state;
    if (product) {
      return (
        <ProductDetails product={product} />
      );
    }
    return (
      <div>no product</div>
    );
  }
}

PDP.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default withRouter(connect(mapStateToProps)(PDP));
