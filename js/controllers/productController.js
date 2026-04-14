import { appState } from "../model/AppState.js";
import {
  renderProducts,
  handleToggleWishList,
  updateWishListIcon,
  handleAddToCart,
  handleRemoveFromCart,
} from "../views/productView.js";
import { updateHeader } from "./headerController.js";

// Toggle wishlist and update wishlist counter
const controlToggleWishlist = function (id, btn) {
  appState.toggleWishList(id);

  const isActive = appState.isInWishlist(id);

  updateWishListIcon(btn, isActive);
  updateHeader();
};

const controlAddToCart = function (id) {
  const existing = appState.getProductById(id);
  if (!existing) return;
  appState.addToCart(existing);

  renderProducts(appState.enrichedProducts);

  updateHeader();
};

const controlRemoveFromCart = function (id) {
  const existing = appState.getProductById(id);
  if (!existing) return;

  appState.removeFromCart(existing.id);

  renderProducts(appState.enrichedProducts);

  updateHeader();
};

// Initial function
function init() {
  updateHeader();
  renderProducts(appState.enrichedProducts);
  handleToggleWishList(controlToggleWishlist);
  handleAddToCart(controlAddToCart);
  handleRemoveFromCart(controlRemoveFromCart);
}

init();
