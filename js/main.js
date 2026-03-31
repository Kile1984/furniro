import { appState } from "./model/AppState.js";
import {
  generateMarkup,
  handleToggleWishList,
  updateWishListIcon,
  updateWishListCount,
} from "./views/productWiew.js";

generateMarkup(appState.products);

const controlToggleWishlist = function (id, btn) {
  appState.toggleWishList(id);

  const isActive = appState.isInWishlist(id);

  updateWishListIcon(btn, isActive);

  updateWishListCount(appState.wishlist.length);
};

function init() {
  handleToggleWishList(controlToggleWishlist);
  updateWishListCount(appState.wishlist.length);
}

init();
