import currencyConstants from '../constants/currency.constants';

const updateCurrency = (currency) => ({
  type: currencyConstants.UPDATE_CURRENCY,
  currency,
});

export default updateCurrency;
