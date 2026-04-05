import { appState } from "../model/AppState.js";
import {
  renderProducts,
  handleToggleWishList,
  updateWishListIcon,
  updateWishListCount,
  updateCartCount,
  handleAddToCart,
} from "../views/productView.js";

// Check is in wishlist
const productWithWishlist = appState.products.map((product) => {
  return {
    ...product,
    isWishlisted: appState.isInWishlist(product.id),
  };
});

// Render products
renderProducts(productWithWishlist);

// Toggle wishlist and update wishlist counter
const controlToggleWishlist = function (id, btn) {
  appState.toggleWishList(id);

  const isActive = appState.isInWishlist(id);
  console.log(isActive);

  updateWishListIcon(btn, isActive);

  updateWishListCount(appState.wishlist.length);
};

const controlAddToCart = function (id) {
  const existing = appState.getProductById(id);
  appState.addToCart(existing);
  updateCartCount(appState.cartItemsCount);
};

// Initial function
function init() {
  handleToggleWishList(controlToggleWishlist);
  updateWishListCount(appState.wishlist.length);
  updateCartCount(appState.cartItemsCount);
  handleAddToCart(controlAddToCart);
}

init();
