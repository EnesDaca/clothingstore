export const selectProducts = (state) => state.product.products;

export const selectFilteredProduct = (state) => state.product.filteredProduct;

// Select the product categories from the state
export const selectProductCategories = (state) => state.product.categories;

// Select the filtered products from the state
export const selectFilteredProducts = (state) => state.product.filteredProduct;
