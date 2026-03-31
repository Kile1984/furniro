import { appState } from "../model/AppState";
import { renderWishlistItems } from "../views/wishlistView";
import { updateWishListCount } from "../views/productView";

function init() {
  renderWishlistItems(appState.wishlist);
  updateWishListCount(appState.wishlist.length);
}

init();
