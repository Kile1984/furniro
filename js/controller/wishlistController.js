import { appState } from "../model/AppState";
import {
  renderWishlistItems,
  handleRemoveItem,
  handleAddToCart,
} from "../views/wishlistView";
import { updateWishListCount } from "../views/productView";

const controlRemoveProductFromWishlist = function (id) {
  appState.removeFromWishlist(id);
  renderWishlistItems(appState.wishlist);
  updateWishListCount(appState.wishlist.length);
};

const controlAddToCart = function (id) {
  const product = appState.getProductById(id);
  if (!product) return;
  appState.addToCart(product);
  appState.removeFromWishlist(product.id);
  renderWishlistItems(appState.wishlist);
  updateWishListCount(appState.wishlist.length);
};

function init() {
  renderWishlistItems(appState.wishlist);
  updateWishListCount(appState.wishlist.length);
  handleRemoveItem(controlRemoveProductFromWishlist);
  handleAddToCart(controlAddToCart);
}

init();
