import { appState } from "../model/AppState.js";
import {
  renderProducts,
  handleToggleWishList,
  updateWishListIcon,
  handleCartClick,
  handleCartButtonState,
} from "../views/productView.js";
import { updateHeader } from "./headerController.js";
import { renderTemplate } from "../views/baseView.js";

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

function initProducts(products) {
  renderProducts(products);
  handleToggleWishList(controlToggleWishlist);
  handleCartClick(controlCart);
}

function homeController() {
  renderTemplate("home");

  const featured = appState.enrichedProducts.slice(0, 8);

  updateHeader();
  initProducts(featured);
}

function shopController() {
  renderTemplate("shop");

  updateHeader();
  initProducts(appState.enrichedProducts);
}

export { homeController, shopController };
