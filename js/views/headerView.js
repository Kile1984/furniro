const DOM = {
  wishListCount: document.querySelector(".header__count"),
  cartCount: document.querySelector(".header__count-cart"),
};

export const renderWishlistCount = function (count) {
  if (!DOM.wishListCount) return;

  DOM.wishListCount.textContent = count;
  DOM.wishListCount.classList.toggle("hidden", count === 0);
};

export const renderCartCount = function (count) {
  if (!DOM.cartCount) return;

  DOM.cartCount.textContent = count;
  DOM.cartCount.classList.toggle("hidden", count === 0);
};
