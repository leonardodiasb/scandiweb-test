import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductDetails.css';
import { connect } from 'react-redux';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { product, currency } = this.props;
    return (
      <div className="product-container">
        <div className="images-container">
          <ul className="images-sidebar">
            {product.gallery.map((photo) => (
              <li key={photo}>
                <img src={photo} alt={product.name} className="side-image" />
              </li>
            ))}
          </ul>
          <div className="main-image-container">
            <img src={product.gallery[0]} alt={product.name} className="main-image" />
          </div>
        </div>
        <div className="product-info-container">
          <div className="name-container">
            <div className="product-brand">{product.brand}</div>
            <div className="product-name">{product.name}</div>
          </div>
          <div className="attributes-container">
            {product.attributes.map((attribute) => (
              <div className="attribute-box" key={attribute.id}>
                <div className="attribute-name">
                  {attribute.name}
                  :
                </div>
                {(attribute.type === 'swatch') ? (
                  <ul className="attribute-list">
                    {attribute.items.map((item) => (
                      <li key={item.id}>
                        <div className="color-box" style={{ 'background-color': item.value }} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="attribute-list">
                    {attribute.items.map((item) => (
                      <li className="item-box" key={item.id}>
                        <div>{item.value}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="price-container">
            <div className="price-name">PRICE:</div>
            <div className="price-amount">
              {currency}
              {product.prices.filter((price) => price.currency.symbol === currency)[0].amount}
            </div>
          </div>
          <div className="add-to-cart">
            <button type="button">ADD TO CART</button>
          </div>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currency: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(ProductDetails);
