import { appState } from "../model/AppState.js";

import {
  renderCart,
  handleRemoveFromCart,
  handleQuantity,
  updateSummary,
  handleInputQuantity,
  updateCartQuantity,
  updateItemSubtotal,
  removeItem,
  showEmptyCart,
} from "../views/cartView.js";
import { updateHeader } from "./headerController.js";

const getSummary = function () {
  return {
    subtotal: appState.cartSubtotal,
    total: appState.cartTotal,
    tax: appState.cartTax,
    shipping: appState.cartShipping,
  };
};

const renderSummary = function () {
  Object.entries(getSummary()).forEach(([type, value]) => {
    updateSummary(type, value);
  });
};

const renderUI = function () {
  renderCart(appState.cartProducts);
  updateHeader();

  // const summary = {
  //   subtotal: appState.cartSubtotal,
  //   total: appState.cartTotal,
  //   tax: appState.cartTax,
  //   shipping: appState.cartShipping,
  // };

  // Object.entries(summary).forEach(([type, value]) => {
  //   updateSummary(type, value);
  // });
  // updateSummary("subtotal", appState.cartSubtotal);
  // updateSummary("total", appState.cartTotal);
  // updateSummary("tax", appState.cartTax);
  // updateSummary("shipping", appState.cartShipping);
};

const controlRemoveFromCart = function (id) {
  appState.removeFromCart(id);
  removeItem(id);

  if (appState.isCartEmpty()) {
    showEmptyCart();
  }

  renderSummary();
  updateHeader();
  // renderUI();
};

const controlQuantity = function (id, act) {
  const product = appState.getCartItem(id);
  if (!product) return;

  const delta = act === "increment" ? 1 : -1;
  const newQuantity = product.quantity + delta;

  appState.updateQuantity(id, newQuantity);
  updateCartQuantity(id, newQuantity);

  const item = appState.getCartItemUI(id);
  if (!item) return;

  updateItemSubtotal(id, item.subtotal);
  renderSummary();
  updateHeader();
};

const controlInputQuantity = function (id, qt) {
  let quantity = Number(qt);

  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;

  appState.updateQuantity(id, quantity);
  updateCartQuantity(id, quantity);
  renderSummary();
  updateHeader();
};

function init() {
  handleRemoveFromCart(controlRemoveFromCart);
  handleQuantity(controlQuantity);
  handleInputQuantity(controlInputQuantity);

  renderUI();
  renderSummary();
}

init();
