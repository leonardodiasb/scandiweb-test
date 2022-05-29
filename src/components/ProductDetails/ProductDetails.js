import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductDetails.css';
import { connect } from 'react-redux';
// import store from '../../redux/configureStore';
// import addToCart from '../../redux/actions/cart.action';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    console.log('component-mounted');
    const { product } = this.props;
    const pa = product.attributes.map((attribute) => ({
      id: attribute.id,
      item: {
        id: attribute.items[0].id,
      },
    }));
    this.setState({ selectedAttributes: pa });
  }

  // eslint-disable-next-line class-methods-use-this
  changeAttribute(attr, item) {
    const { selectedAttributes } = this.state;
    // const newAttribute = selectedAttributes.filter((attribute) => ({
    //   item:
    // }));
    // eslint-disable-next-line max-len
    selectedAttributes.filter((attribute) => attribute.id === attr)[0].item.id = item;
    console.log(selectedAttributes);
    this.forceUpdate();
    // this.setState({ selectedAttributes });
  }

  // eslint-disable-next-line class-methods-use-this
  addProduct(product, attributes) {
    // const productAttributes = product.attributes.map((attribute) => {
    //   attribute.id,
    //   attribute.items,
    // });
    const cartProduct = {
      id: product,
      amount: 1,
      attributes,
    };
    console.log(this.state);
    console.log(cartProduct);
  }

  render() {
    const { product, currency } = this.props;
    const { selectedAttributes } = this.state;
    if (selectedAttributes.length) {
      console.log('yes');
    } else {
      console.log('no');
    }
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
            <div className="price-amount">
              {currency}
              {product.prices.filter((price) => price.currency.symbol === currency)[0].amount}
            </div>
          </div>
          <div className="add-to-cart">
            <button type="button" onClick={() => { this.addProduct(product.id, selectedAttributes); }}>ADD TO CART</button>
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
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.currency.currency.symbol,
});

export default connect(mapStateToProps)(ProductDetails);
