import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { products, cart } = this.props;
    console.log(cart);
    console.log(products);
    // console.log(cart.map((product) => (
    //   products.filter((p) => p.id === product.id)[0]
    // )));
    return (
      <div>CART PAGE</div>
    );
  }
}

CartPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  products: state.products.products,
  cart: state.cart.cart,
});

export default connect(mapStateToProps)(CartPage);
