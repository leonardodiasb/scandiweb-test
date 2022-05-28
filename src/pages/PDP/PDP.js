import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import withRouter from '../../hoc/withRouter';
import './PDP.css';
import ProductDetails from '../../components/ProductDetails/ProductDetails';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const { id } = location.state;
    const { client } = this.props;
    const response = await client.query({
      query: gql`
      query ReadCategories {
        product(id: "${id}") {
          id,
          name,
          inStock,
          gallery,
          description,
          category,
          attributes {
            id,
            name,
            type,
            items {
              displayValue,
              value,
              id
            }
          },
          prices {
            currency {
              label,
              symbol,
            },
            amount,
          },
          brand
        }
      }`,
    });
    this.setState({ product: response.data.product });
    // store.dispatch(fetchCategories(response.data.categories));
  }

  render() {
    const { product } = this.state;
    if (product) {
      return (
        <ProductDetails product={product} />
      );
    }
    return (
      <div>no product</div>
    );
  }
}

PDP.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // product: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(PDP);
