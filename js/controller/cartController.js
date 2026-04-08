import { appState } from "../model/AppState.js";
import { updateWishListCount, updateCartCount } from "../views/productView.js";

import {
  renderCart,
  handleRemoveFromCart,
  handleQuantity,
  updateCartSubtotal,
  updateTotal,
} from "../views/cartView.js";

const renderUI = function () {
  renderCart(appState.cartProducts);
  updateCartCount(appState.cartItemsCount);
  updateCartSubtotal(appState.cartSubtotal);
  updateTotal(appState.cartTotal);
};

const controlRemoveFromCart = function (id) {
  appState.removeFromCart(id);
  renderUI();
};

const controlQuantity = function (id, act) {
  appState.updateQuantity(id, act);
  renderUI();
};

function init() {
  renderUI();
  updateWishListCount(appState.wishlist.length);

  handleRemoveFromCart(controlRemoveFromCart);
  handleQuantity(controlQuantity);
}

init();
