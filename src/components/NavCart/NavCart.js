/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavCart.css';
import CartProduct from '../CartProduct/CartProduct';

class NavCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    const { onClickOutside } = this.props;
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      // eslint-disable-next-line no-unused-expressions
      onClickOutside && onClickOutside();
    }
  }

  sumAllValues(arr, currency) {
    const sum = arr.reduce((acc, obj) => (
      acc + obj.amount * obj.prices.filter((p) => p.currency.symbol === currency)[0].amount), 0);
    return sum.toFixed(2);
  }

  render() {
    const {
      cart, currency, cartActive, cartAmount, onClickOutside,
    } = this.props;
    const allValues = this.sumAllValues(cart, currency);
    if (!cartActive) { return null; }
    return (
      <div className="nav-cart-container" ref={this.ref}>
        <div className="bag-title">
          <strong>My Bag,</strong>
          {' '}
          {cartAmount}
          {' '}
          items
        </div>
        <div className="cart-menu">
          {cart.map((product) => (
            <CartProduct product={product} key={product.id} cartMenu />
          ))}
        </div>
        <div className="total-box">
          <div className="menu-total">Total</div>
          <div className="menu-total-value">
            {currency}
            {allValues}
          </div>
        </div>
        <div className="bag-buttons">
          <Link to="/cart" className="view-btn" onClick={() => { onClickOutside(); }}>
            VIEW BAG
          </Link>
          <button type="button" className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    );
  }
}

NavCart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currency: PropTypes.string.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  cartActive: PropTypes.bool.isRequired,
  cartAmount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(NavCart);
