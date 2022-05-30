import productsConstants from '../constants/products.constants';

const addProduct = (payload) => ({
  type: productsConstants.ADD_PRODUCT,
  payload,
});

export default addProduct;
