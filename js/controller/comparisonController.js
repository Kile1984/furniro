import { appState } from "../model/AppState";
import { updateWishListCount } from "../views/productView";

function init() {
  updateWishListCount(appState.wishlist.length);
}

init();
