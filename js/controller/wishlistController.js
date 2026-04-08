import { appState } from "../model/AppState.js";
import {
  renderWishlistItems,
  handleWishlistActions,
} from "../views/wishlistView.js";
import { updateWishListCount, updateCartCount } from "../views/productView.js";

const renderUI = function () {
  renderWishlistItems(appState.wishlistProducts);
  updateWishListCount(appState.wishlist.length);
  updateCartCount(appState.cartItemsCount);
};

const controlWishlist = function (type, id) {
  if (type === "remove") appState.removeFromWishlist(id);
  if (type === "add") appState.moveToCartFromWishlist(id);

  renderUI();
};

function init() {
  renderUI();
  handleWishlistActions(controlWishlist);
}

init();
