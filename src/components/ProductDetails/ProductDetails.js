/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductDetails.css';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import store from '../../redux/configureStore';
import { addToCart } from '../../redux/actions/cart.action';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
      imageDisplayed: '',
    };
  }

  componentDidMount() {
    const { product } = this.props;
    const pa = product.attributes.map((attribute) => ({
      id: attribute.id,
      item: {
        id: attribute.items[0].id,
      },
    }));
    this.setState({ selectedAttributes: pa, imageDisplayed: product.gallery[0] });
  }

  changeAttribute(attr, item) {
    const { selectedAttributes } = this.state;
    const newAtt = {
      id: attr,
      item: {
        id: item,
      },
    };
    const updateAttributes = selectedAttributes.map((item) => {
      if (item.id !== attr) {
        return item;
      }
      return newAtt;
    });
    this.setState({ selectedAttributes: updateAttributes });
  }

  addProduct(productId, productName, attributes, prices) {
    const attributesId = attributes.map((att) => (
      att.item.id
    )).join('-');
    const cartProduct = {
      id: productId.concat('-', attributesId),
      name: productName,
      amount: 1,
      attributes,
      prices,
    };
    store.dispatch(addToCart(cartProduct));
  }

  changeMainImage(image) {
    this.setState({ imageDisplayed: image });
  }

  render() {
    const { product, currency } = this.props;
    const { selectedAttributes, imageDisplayed } = this.state;
    return (
      <div className="product-container">
        <div className="images-container">
          <ul className="images-sidebar">
            {product.gallery.map((photo) => (
              <li key={photo} className="img-list-item">
                <button type="button" onClick={() => { this.changeMainImage(photo); }} className="img-btn">
                  <img src={photo} alt={product.name} className="side-image" />
                </button>
              </li>
            ))}
          </ul>
          <div className="main-image-container">
            <img src={imageDisplayed} alt={product.name} className="main-image" />
          </div>
        </div>
        <div className="product-info-container">
          <div className="name-container">
            <div className="product-brand">{product.brand}</div>
            <div className="product-name">{product.name}</div>
          </div>
          <div className="attributes-container">
            {selectedAttributes.length ? (
              <div>
                {product.attributes.map((attribute) => (
                  <div className="attribute-box" key={attribute.id}>
                    <div className="attribute-name">
                      {attribute.name}
                      :
                    </div>
                    {(attribute.type === 'swatch') ? (
                      <ul className="attribute-list">
                        {attribute.items.map((item) => (
                          <li key={item.id} className={selectedAttributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'color-box-wrapper-active' : 'color-box-wrapper'}>
                            <div className="color-box" style={{ backgroundColor: item.value }} onClick={() => { this.changeAttribute(attribute.id, item.id); }} aria-hidden="true" />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="attribute-list">
                        {attribute.items.map((item) => (
                          <li key={item.id}>
                            <button className={selectedAttributes.filter((att) => att.id === attribute.id)[0].item.id === item.id ? 'item-box-active' : 'item-box'} type="button" onClick={() => { this.changeAttribute(attribute.id, item.id); }}>{item.value}</button>
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
          <div className="price-container">
            <div className="price-name">PRICE:</div>
            {product.inStock ? (
              <div className="price-amount">
                {currency}
                {product.prices.filter((price) => price.currency.symbol === currency)[0].amount}
              </div>
            ) : (
              <div className="price-amount">
                OUT OF STOCK
              </div>
            )}
          </div>
          <div className="add-to-cart">
            <button type="button" onClick={() => { this.addProduct(product.id, product.name, selectedAttributes, product.prices); }} className={product.inStock ? '' : 'disabled-link'}>ADD TO CART</button>
          </div>
          <div className="product-description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(ProductDetails);
