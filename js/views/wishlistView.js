import icons from "url:../../assets/icons/sprite.svg";

const container = document.querySelector(".wishlist-page__item-wrapp");
// Render wishlist
export const renderWishlistItems = function (products) {
  if (products.length === 0) {
    container.innerHTML = `<div class="wishlist-page__empty"><span class="text-body-xl">!!! Wishlist is empty !!!</span><a class="btn btn--primary" href="shop.html">Got to products</a></div>`;

    document
      .querySelector(".wishlist-page__items")
      .classList.toggle("wishlist-page__toggle-min-width");
    return;
  }

  const markup = products
    .map((product) => {
      return `
    <div class="wishlist-page__item">
        <div class="wishlist-page__product">
        <a href="#" class="wishlist-page__link">
            <img
            src="${product.images.main}"
            alt="Grifo"
            />
            <span>${product.title}</span>
        </a>
        </div>

        <div class="wishlist-page__price">
        <span class="wishlist-page__price-label">Price</span>
        <span>$ ${product.price.current}</span>
        </div>

        <button class="btn btn--primary wishlist-page__add-btn"  data-id=${product.id}>Add to cart</button>

         <button class="wishlist-page__remove-btn" data-id=${product.id}>
            <svg class="icon">
            <use href="${icons}#icon-bin2"></use>
            </svg>
        </button>
    </div>
    `;
    })
    .join("");

  container.innerHTML = markup;
};
// Remove from wishlist
export const handleRemoveItem = function (handler) {
  const container = document.querySelector(".wishlist-page__item-wrapp");
  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".wishlist-page__remove-btn");

    if (!btn) return;

    const id = btn.dataset.id;

    handler(id);
  });
};

// Add to cart

export const handleAddToCart = function (handler) {
  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".wishlist-page__add-btn");
    if (!btn) return;

    const id = btn.dataset.id;

    handler(id);
  });
};
