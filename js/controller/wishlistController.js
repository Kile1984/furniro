import { appState } from "../model/AppState";
import { renderWishlistItems } from "../views/wishlistView";
import { updateWishListCount } from "../views/productView";

console.log(appState);

function init() {
  renderWishlistItems(appState.wishlist);
  updateWishListCount(appState.wishlist.length);
}

init();
