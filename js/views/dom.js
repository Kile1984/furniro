const getEl = (selector) => document.querySelector(selector);

export const DOM = {
  // ROOT
  app: () => getEl("#app"),

  // PRODUCTS
  productGrid: () => getEl(".products__grid"),

  // HEADER
  header: {
    wishListCount: () => getEl(".header__count"),
    cartCount: () => getEl(".header__count-cart"),
  },

  // CART
  cart: {
    container: () => getEl(".cart-page__item-wrapp"),
    subtotal: () => getEl(".cart-page__summary-price--subtotal"),
    total: () => getEl(".cart-page__summary-price--total"),
    items: () => getEl(".cart-page__items"),
    tax: () => getEl(".cart-page__summary-price--tax"),
    shipping: () => getEl(".cart-page__summary-price--shipping"),
    input: () => getEl(".cart-page__quantity-input"),
  },
};
