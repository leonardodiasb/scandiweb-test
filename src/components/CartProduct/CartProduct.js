/* eslint-disable react/forbid-prop-types */
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
      imagesGallery: [],
      imageDisplayed: '',
    };
  }

  componentDidMount() {
    const { product, products } = this.props;
    const productInfo = products.filter((p) => p.name === product.name)[0];
    this.setState({ imagesGallery: productInfo.gallery, imageDisplayed: productInfo.gallery[0] });
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

  changeImage(arrow) {
    const { imagesGallery, imageDisplayed } = this.state;
    const imgPosition = imagesGallery.indexOf(imageDisplayed);
    if (arrow === 'left') {
      if (imgPosition > 0) {
        this.setState({ imageDisplayed: imagesGallery[imgPosition - 1] });
      }
      if (imgPosition === 0) {
        this.setState({ imageDisplayed: imagesGallery[imagesGallery.length - 1] });
      }
    }
    if (arrow === 'right') {
      if (imgPosition < (imagesGallery.length - 1)) {
        this.setState({ imageDisplayed: imagesGallery[imgPosition + 1] });
      }
      if (imgPosition === (imagesGallery.length - 1)) {
        this.setState({ imageDisplayed: imagesGallery[0] });
      }
    }
  }

  render() {
    const {
      product, products, currency, cartMenu,
    } = this.props;
    const { imageDisplayed } = this.state;
    const productInfo = products.filter((p) => p.name === product.name)[0];
    return (
      <div className={cartMenu ? 'menu-cart-row' : 'product-cart-row'}>
        <div className={cartMenu ? 'menu-info-container' : 'cart-product-info-container'}>
          <div className={cartMenu ? 'menu-name-container' : 'cart-name-container'}>
            <div className={cartMenu ? 'menu-product-brand' : 'product-brand'}>{productInfo.brand}</div>
            <div className={cartMenu ? 'menu-product-name' : 'product-name'}>{productInfo.name}</div>
          </div>
          <div className={cartMenu ? 'menu-price-amount' : 'cart-price-amount'}>
            {currency}
            {productInfo.prices.filter((price) => price.currency.symbol === currency)[0].amount}
          </div>
          <div className={cartMenu ? 'menu-attributes-container' : 'attributes-container'}>
            {product.attributes.length ? (
              <div>
                {productInfo.attributes.map((attribute) => (
                  <div className={cartMenu ? 'menu-attribute-box' : 'attribute-box-cart'} key={attribute.id}>
                    <div className={cartMenu ? 'menu-attribute-name' : 'attribute-name'}>
                      {attribute.name}
                      :
                    </div>
                    {(attribute.type === 'swatch') ? (
                      <ul className={cartMenu ? 'menu-attribute-list' : 'attribute-list'}>
                        {attribute.items.map((item) => (
                          <li key={item.id} className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'color-box-wrapper-active' : 'color-box-wrapper'}>
                            <div className={cartMenu ? 'menu-color-box' : 'cart-color-box'} style={{ backgroundColor: item.value }} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className={cartMenu ? 'menu-attribute-list' : 'attribute-list'}>
                        {attribute.items.map((item) => (
                          <li key={item.id}>
                            {cartMenu ? (
                              <div className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'menu-item-box-active' : 'menu-item-box'}>{item.value}</div>
                            ) : (
                              <div className={product.attributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'cart-item-box-active' : 'cart-item-box'}>{item.value}</div>
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
            <img src={imageDisplayed} alt={productInfo.name} />
            {productInfo.gallery.length > 1 && !cartMenu ? (
              <div className="arrow-box">
                <button type="button" className="arrow-left" onClick={() => { this.changeImage('left'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="arrow-right" onClick={() => { this.changeImage('right'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CartProduct.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
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
