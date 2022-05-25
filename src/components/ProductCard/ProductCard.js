import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { product, currency } = this.props;
    return (
      <div>
        <img src={product.gallery[0]} alt={product.name} style={{ width: '354px' }} />
        <div>
          <div>
            {product.name}
          </div>
          <div>
            {currency}
            {product.prices.filter((price) => price.currency.symbol === currency)[0].amount}
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  currency: PropTypes.string.isRequired,
};
