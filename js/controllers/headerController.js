import { appState } from "../model/AppState.js";
import { renderWishlistCount, renderCartCount } from "../views/headerView.js";

export const updateHeader = function () {
  renderWishlistCount(appState.wishlist.length);
  renderCartCount(appState.cartItemsCount);
};

export const initHeader = function () {
  updateHeader();
};
