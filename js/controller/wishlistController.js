import { appState } from "../model/AppState.js";
import {
  renderWishlistItems,
  handleRemoveItem,
  handleAddToCart,
} from "../views/wishlistView.js";
import { updateWishListCount, updateCartCount } from "../views/productView.js";

const controlRemoveProductFromWishlist = function (id) {
  appState.removeFromWishlist(id);
  renderWishlistItems(appState.wishlistProduct);
  updateWishListCount(appState.wishlist.length);
};

const controlAddToCart = function (id) {
  const product = appState.getProductById(id);
  if (!product) return;
  appState.addToCart(product);
  appState.removeFromWishlist(product.id);
  renderWishlistItems(appState.wishlistProduct);
  updateWishListCount(appState.wishlist.length);
  updateCartCount(appState.cartItemsCount);
};

function init() {
  renderWishlistItems(appState.wishlistProduct);
  updateWishListCount(appState.wishlist.length);
  updateCartCount(appState.cartItemsCount);
  handleRemoveItem(controlRemoveProductFromWishlist);
  handleAddToCart(controlAddToCart);
}

init();
