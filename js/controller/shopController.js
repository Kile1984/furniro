import { appState } from "../model/AppState.js";
import { updateWishListCount, updateCartCount } from "../views/productView.js";

function init() {
  updateWishListCount(appState.wishlist.length);
  updateCartCount(appState.cartItemsCount);
}

init();
