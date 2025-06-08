import api from './api';

const APIs = {
  allProducts: '/product/list',
  product: '/product',
  getSKU: '/product/:id/skus/find-by-attribute-values',
};

export const getAllProducts = async() => {
  try {
    const response = await api.get(APIs.allProducts);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getProductById = async(id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getSKUByAttributeValueIds = async(productId, attributeValueIds) => {
  try {
    const apiPath = APIs.getSKU.replace(':id', productId);
    const response = await api.post(apiPath, {
      product_attribute_ids: attributeValueIds,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
