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

function getProductContainer() {
  const container = document.querySelector(".products__grid");
  if (!container) {
    console.error("Product container not found");
    return null;
  }

  return container;
}

function initProducts(container, products) {
  renderProducts(container, products);
  handleToggleWishList(container, controlToggleWishlist);
  handleCartClick(container, controlCart);
}

function homeController() {
  renderTemplate("home");

  const container = getProductContainer();
  const featured = appState.enrichedProducts.slice(0, 8);

  updateHeader();
  initProducts(container, featured);
}

function shopController() {
  renderTemplate("shop");

  const container = getProductContainer();
  updateHeader();
  initProducts(container, appState.enrichedProducts);
}

export { homeController, shopController };
