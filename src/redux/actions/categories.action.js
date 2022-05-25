import categoriesConstants from '../constants/categories.constants';

const fetchCategories = (payload) => ({
  type: categoriesConstants.FETCH_CATEGORIES,
  payload,
});

export default fetchCategories;
