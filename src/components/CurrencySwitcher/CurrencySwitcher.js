/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../redux/configureStore';
import { updateCurrency, fetchCurrencies } from '../../redux/actions/currency.action';
import './CurrencySwitcher.css';
import { readCurrencies } from '../../graphql/queries.utils';

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  async componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    const { currencies } = this.props;
    if (!currencies) {
      const { client } = this.props;
      const response = await readCurrencies(client);
      store.dispatch(fetchCurrencies(response.data.currencies));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    const { onClickOutside } = this.props;
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      // eslint-disable-next-line no-unused-expressions
      onClickOutside && onClickOutside();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleCurrencyStore(e) {
    const curr = {
      label: e.target.lastChild.data,
      symbol: e.target.firstChild.data,
    };
    store.dispatch(updateCurrency(curr));
    const { toggleCurrency } = this.props;
    toggleCurrency();
  }

  render() {
    const { currencies, currencyActive } = this.props;
    if (!currencyActive) { return null; }
    return (
      <ul id="currencies-list" ref={this.ref}>
        {currencies.map((currency) => (
          <li key={currency.label}>
            <button type="button" onClick={(e) => { this.handleCurrencyStore(e); }}>
              {currency.symbol}
              {currency.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

CurrencySwitcher.propTypes = {
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any),
  onClickOutside: PropTypes.func.isRequired,
  currencyActive: PropTypes.bool.isRequired,
};

CurrencySwitcher.defaultProps = {
  currencies: null,
};

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
});

export default connect(mapStateToProps)(CurrencySwitcher);
