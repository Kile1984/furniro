import icons from "url:../../assets/icons/sprite.svg";

// render wishlist
export const renderWishlistItems = function (products) {
  const container = document.querySelector(".wishlist-page__item-wrapp");
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

        <button class="btn btn--primary">Add to cart</button>

         <button class="wishlist-page__remove-btn" data-id=${product.id}>
            <svg class="icon">
            <use href="${icons}#icon-bin2"></use>
            </svg>
        </button>
    </div>
    `;
    })
    .join("");

  container.insertAdjacentHTML("afterbegin", markup);
};
