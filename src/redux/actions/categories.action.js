import categoriesConstants from '../constants/categories.constants';

const fetchCategory = (payload) => ({
  type: categoriesConstants.FETCH_CATEGORIES,
  payload,
});

export default fetchCategory;
