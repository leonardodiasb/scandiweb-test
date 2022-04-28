import currencyConstants from '../constants/currency.constants';

const initialState = {
  currency: {
    label: 'USD',
    symbol: '$',
  },
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyConstants.UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    default:
      return state;
  }
};

export default currencyReducer;
