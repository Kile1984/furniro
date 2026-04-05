import { appState } from "../model/AppState.js";
import { updateWishListCount, updateCartCount } from "../views/productView.js";

import {
  renderCart,
  handleRemoveFromCart,
  handleQuantity,
} from "../views/cartView.js";

const controlRemoveFromCart = function (product) {
  appState.removeFromCart(product);
  renderCart(appState.cart);
  updateCartCount(appState.cartItemsCount);
};

const controlQuantity = function (id, act) {
  appState.updateQuantity(id, act);
  renderCart(appState.cart);
  updateCartCount(appState.cartItemsCount);
};

function init() {
  renderCart(appState.cart);
  updateWishListCount(appState.wishlist.length);
  updateCartCount(appState.cartItemsCount);
  handleRemoveFromCart(controlRemoveFromCart);
  handleQuantity(controlQuantity);
}

init();
