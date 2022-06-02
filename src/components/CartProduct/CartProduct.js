/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../redux/configureStore';
import './CartProduct.css';
import {
  incrementAmount, decrementAmount, removeFromCart,
} from '../../redux/actions/cart.action';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  increment(product) {
    store.dispatch(incrementAmount(product));
  }

  decrement(product) {
    store.dispatch(decrementAmount(product));
  }

  remove(product) {
    store.dispatch(removeFromCart(product));
  }

  render() {
    const {
      product, products, currency, cartMenu,
    } = this.props;
    const productInfo = products.filter((p) => p.name === product.name);
    return (
      <div className={cartMenu ? 'menu-cart-row' : 'product-cart-row'}>
        <div className={cartMenu ? 'menu-info-container' : 'product-info-container'}>
          <div className={cartMenu ? 'menu-name-container' : 'name-container'}>
            <div className={cartMenu ? 'menu-product-brand' : 'product-brand'}>{productInfo[0].brand}</div>
            <div className={cartMenu ? 'menu-product-name' : 'product-name'}>{productInfo[0].name}</div>
          </div>
          <div className={cartMenu ? 'menu-price-amount' : 'price-amount'}>
            {currency}
            {productInfo[0].prices.filter((price) => price.currency.symbol === currency)[0].amount}
          </div>
          <div className={cartMenu ? 'menu-attributes-container' : 'attributes-container'}>
            {product.attributes.length ? (
              <div>
                {productInfo[0].attributes.map((attribute) => (
                  <div className={cartMenu ? 'menu-attribute-box' : 'attribute-box-cart'} key={attribute.id}>
                    <div className={cartMenu ? 'menu-attribute-name' : 'attribute-name'}>
                      {attribute.name}
                      :
                    </div>
                    {(attribute.type === 'swatch') ? (
                      <ul className={cartMenu ? 'menu-attribute-list' : 'attribute-list'}>
                        {attribute.items.map((item) => (
                          <li key={item.id} className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'color-box-wrapper-active' : 'color-box-wrapper'}>
                            <div className={cartMenu ? 'menu-color-box' : 'color-box'} style={{ backgroundColor: item.value }} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className={cartMenu ? 'menu-attribute-list' : 'attribute-list'}>
                        {attribute.items.map((item) => (
                          <li key={item.id}>
                            {cartMenu ? (
                              <button className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'menu-item-box-active' : 'menu-item-box'} type="button">{item.value}</button>
                            ) : (
                              <button className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'item-box-active' : 'item-box'} type="button">{item.value}</button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>
          <button type="button" className={cartMenu ? 'menu-exclude-button' : 'exclude-button'} onClick={() => { this.remove(product); }}>Exclude</button>
        </div>
        <div className={cartMenu ? 'menu-amount-image-container' : 'amount-image-container'}>
          <div className={cartMenu ? 'menu-amount-box' : 'amount-box'}>
            <button type="button" className={cartMenu ? 'menu-increment-button' : 'increment-button'} onClick={() => { this.increment(product); }}>
              <span className={cartMenu ? 'menu-vertical-vector' : 'vertical-vector'} />
              <span className={cartMenu ? 'menu-horizontal-vector' : 'horizontal-vector'} />
            </button>
            <div className={cartMenu ? 'menu-product-amount' : 'product-amount'}>{product.amount}</div>
            <button type="button" className={cartMenu ? 'menu-decrement-button' : 'decrement-button'} onClick={() => { this.decrement(product); }} disabled={product.amount === 0}>
              <span className={cartMenu ? 'menu-horizontal-vector' : 'horizontal-vector'} />
            </button>
          </div>
          <div className={cartMenu ? 'menu-image-box' : 'image-box'}>
            <img src={productInfo[0].gallery[0]} alt={productInfo[0].name} />
          </div>
        </div>
      </div>
    );
  }
}

CartProduct.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  currency: PropTypes.string.isRequired,
  cartMenu: PropTypes.bool,
};

CartProduct.defaultProps = {
  cartMenu: false,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(CartProduct);
