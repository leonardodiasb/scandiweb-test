import categoriesConstants from '../constants/categories.constants';

const initialState = {
  categories: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoriesConstants.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
