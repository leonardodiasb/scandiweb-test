/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../redux/configureStore';
import './CartProduct.css';
import {
  incrementAmount, decrementAmount, changeAttribute, removeFromCart,
} from '../../redux/actions/cart.action';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('MOUNT');
  }

  changeAttribute(attr, item) {
    const { product } = this.props;
    const payload = {
      productId: product.id,
      productAttributes: product.attributes,
      newAttribute: {
        id: attr,
        item: {
          id: item,
        },
      },
    };
    store.dispatch(changeAttribute(payload));
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
    const { product, products, currency } = this.props;
    const productInfo = products.filter((p) => p.id === product.id);
    return (
      <div className="product-cart-row">
        <div className="product-info-container">
          <div className="name-container">
            <div className="product-brand">{productInfo[0].brand}</div>
            <div className="product-name">{productInfo[0].name}</div>
          </div>
          <div className="price-amount">
            {currency}
            {productInfo[0].prices.filter((price) => price.currency.symbol === currency)[0].amount}
          </div>
          <div className="attributes-container">
            {product.attributes.length ? (
              <div>
                {productInfo[0].attributes.map((attribute) => (
                  <div className="attribute-box-cart" key={attribute.id}>
                    <div className="attribute-name">
                      {attribute.name}
                      :
                    </div>
                    {(attribute.type === 'swatch') ? (
                      <ul className="attribute-list">
                        {attribute.items.map((item) => (
                          <li key={item.id} className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'color-box-wrapper-active' : 'color-box-wrapper'}>
                            <div className="color-box" style={{ backgroundColor: item.value }} onClick={() => { this.changeAttribute(attribute.id, item.id); }} aria-hidden="true" />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="attribute-list">
                        {attribute.items.map((item) => (
                          <li key={item.id}>
                            <button className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'item-box-active' : 'item-box'} type="button" onClick={() => { this.changeAttribute(attribute.id, item.id); }}>{item.value}</button>
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
          <button type="button" className="exclude-button" onClick={() => { this.remove(product); }}>Exclude</button>
        </div>
        <div className="amount-image-container">
          <div className="amount-box">
            <button type="button" className="increment-button" onClick={() => { this.increment(product); }}>
              <span className="vertical-vector" />
              <span className="horizontal-vector" />
            </button>
            <div className="product-amount">{product.amount}</div>
            <button type="button" className="decrement-button" onClick={() => { this.decrement(product); }} disabled={product.amount === 0}>
              <span className="horizontal-vector" />
            </button>
          </div>
          <div className="image-box">
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
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(CartProduct);
