import { appState } from "../model/AppState.js";

import {
  renderCart,
  handleRemoveFromCart,
  handleQuantity,
  updateSummary,
  handleInputQuantity,
} from "../views/cartView.js";

import { updateHeader } from "./headerController.js";

// SUMMARY
const getSummary = function () {
  return {
    subtotal: appState.cartSubtotal,
    total: appState.cartTotal,
    tax: appState.cartTax,
    shipping: appState.cartShipping,
  };
};

const renderSummary = function () {
  updateSummary(getSummary());
};

// MAIN UI RENDER
const renderUI = function () {
  renderCart(appState.cartProducts);
  updateHeader();
  renderSummary();
};

// CONTROLLERS

const controlRemoveFromCart = function (id) {
  appState.removeFromCart(id);
  renderUI();
};

const controlQuantity = function (id, act) {
  const product = appState.getCartItem(id);
  if (!product) return;

  const delta = act === "increment" ? 1 : -1;
  const newQuantity = product.quantity + delta;

  appState.updateQuantity(id, newQuantity);

  renderUI();
};

const controlInputQuantity = function (id, qt) {
  let quantity = Number(qt);

  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;

  appState.updateQuantity(id, quantity);

  renderUI();
};

// INIT

function init() {
  handleRemoveFromCart(controlRemoveFromCart);
  handleQuantity(controlQuantity);
  handleInputQuantity(controlInputQuantity);

  renderUI();
}

init();
