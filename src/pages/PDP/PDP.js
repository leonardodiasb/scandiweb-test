/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withRouter from '../../hoc/withRouter';
import './PDP.css';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import store from '../../redux/configureStore';
import addProduct from '../../redux/actions/products.action';
import { readProduct } from '../../graphql/queries.utils';

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
      const response = await readProduct(client, id);
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
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default withRouter(connect(mapStateToProps)(PDP));
