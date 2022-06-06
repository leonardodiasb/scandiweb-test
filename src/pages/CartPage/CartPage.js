/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartProduct from '../../components/CartProduct/CartProduct';
import './CartPage.css';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getTax(value) {
    const tax = 0.21;
    return (value * tax).toFixed(2);
  }

  sumAllValues(arr, currency) {
    const sum = arr.reduce((acc, obj) => (
      acc + obj.amount * obj.prices.filter((p) => p.currency.symbol === currency)[0].amount), 0);
    return sum.toFixed(2);
  }

  sumAmount(arr) {
    const sum = arr.reduce((accumulator, object) => accumulator + object.amount, 0);
    return sum;
  }

  render() {
    const { cart, currency } = this.props;
    const allAmount = this.sumAmount(cart);
    const allValues = this.sumAllValues(cart, currency);
    const allTaxes = this.getTax(allValues);
    return (
      <div className="cart-container">
        <div className="cart-title">
          <h1>CART</h1>
        </div>
        <div className="cart-products">
          {cart.map((product) => (
            <CartProduct product={product} key={product.id} />
          ))}
        </div>
        <div className="order-box">
          <div className="order-info-box">
            <div className="order-info-column">
              <div className="order-info-row">
                <div className="order-info">Tax 21%</div>
              </div>
              <div className="order-info-row">
                <div className="order-info">Quantity:</div>
              </div>
              <div className="order-info-row">
                <div className="order-info">Total</div>
              </div>
            </div>
            <div className="order-info-column">
              <div className="order-info-row">
                <div className="order-value">
                  {currency}
                  {allTaxes}
                </div>
              </div>
              <div className="order-info-row">
                <div className="order-value">{allAmount}</div>
              </div>
              <div className="order-info-row">
                <div className="order-value">
                  {currency}
                  {allValues}
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="order-button">ORDER</button>
        </div>
      </div>
    );
  }
}

CartPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(CartPage);
