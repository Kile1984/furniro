import { appState } from "../model/AppState.js";
import {
  renderProducts,
  handleToggleWishList,
  updateWishListIcon,
  handleCartClick,
  handleCartButtonState,
} from "../views/productView.js";
import { updateHeader } from "./headerController.js";

// Toggle wishlist and update wishlist counter
const controlToggleWishlist = function (id, btn) {
  appState.toggleWishList(id);

  const isActive = appState.isInWishlist(id);

  updateWishListIcon(btn, isActive);
  updateHeader();
};

const controlCart = function (id) {
  const product = appState.getProductById(id);
  if (!product) return;

  const isInCart = appState.isInCart(id);

  if (isInCart) {
    appState.removeFromCart(id);
    handleCartButtonState(id, false);
  } else {
    appState.addToCart(product);
    handleCartButtonState(id, true);
  }

  updateHeader();
};
// Initial function
function init() {
  updateHeader();
  renderProducts(appState.enrichedProducts);
  handleToggleWishList(controlToggleWishlist);
  handleCartClick(controlCart);
}

init();
