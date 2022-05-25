import currencyConstants from '../constants/currency.constants';

export const updateCurrency = (payload) => ({
  type: currencyConstants.UPDATE_CURRENCY,
  payload,
});

export const fetchCurrencies = (payload) => ({
  type: currencyConstants.FETCH_CURRENCIES,
  payload,
});

// export default { updateCurrency, fetchCurrencies };
