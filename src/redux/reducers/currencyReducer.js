import currencyConstants from '../constants/currency.constants';

const initialState = {
  currencies: null,
  currency: {
    label: '',
    symbol: '',
  },
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyConstants.UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case currencyConstants.FETCH_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    default:
      return state;
  }
};

export default currencyReducer;
