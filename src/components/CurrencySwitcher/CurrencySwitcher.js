import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import store from '../../redux/configureStore';
import updateCurrency from '../../redux/actions/currency.action';
import './CurrencySwitcher.css';

export default class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currencies: null,
    };
  }

  async componentDidMount() {
    const { client } = this.props;
    const response = await client.query({
      query: gql`
      query ReadCurrencies {
        currencies {
          label,
          symbol
        }
      }`,
    });
    this.setState({ currencies: response.data.currencies, loading: false });
  }

  // eslint-disable-next-line class-methods-use-this
  handleCurrencyStore(e) {
    const curr = {
      label: e.target.lastChild.data,
      symbol: e.target.firstChild.data,
    };
    store.dispatch(updateCurrency(curr));
    const { handleToggle } = this.props;
    handleToggle();
  }

  render() {
    const { loading, currencies } = this.state;
    return (
      <>
        {loading || !currencies ? (
          <div />
        ) : (
          <ul id="currencies-list">
            {currencies.map((currency) => (
              <li key={currency.label}>
                <button type="button" onClick={(e) => { this.handleCurrencyStore(e); }}>
                  {currency.symbol}
                  {currency.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

CurrencySwitcher.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  handleToggle: PropTypes.func.isRequired,
};
