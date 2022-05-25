import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import store from '../../redux/configureStore';
import { updateCurrency, fetchCurrencies } from '../../redux/actions/currency.action';
import './CurrencySwitcher.css';

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { currencies } = this.props;
    if (!currencies) {
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
      store.dispatch(fetchCurrencies(response.data.currencies));
    }
    this.setState({ loading: false });
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
    const { loading } = this.state;
    const { currencies } = this.props;
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
  // eslint-disable-next-line react/forbid-prop-types
  currencies: PropTypes.arrayOf(PropTypes.any),
};

CurrencySwitcher.defaultProps = {
  currencies: null,
};

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
});

export default connect(mapStateToProps)(CurrencySwitcher);
