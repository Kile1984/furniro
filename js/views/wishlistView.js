import icons from "url:../../assets/icons/sprite.svg";

const DOM = {
  container: document.querySelector(".wishlist-page__item-wrapp"),
  parent: document.querySelector(".wishlist-page__items"),
};

// Render wishlist
export const renderWishlistItems = function (products) {
  console.log(products);
  if (products.length === 0) {
    DOM.container.innerHTML = `
    <div class="wishlist-page__empty"><span class="text-body-xl">!!! Wishlist is empty !!!</span><a class="btn btn--primary" href="shop.html">Got to products</a></div>
    `;

    DOM.parent.classList.add("wishlist-page__toggle-min-width");

    return;
  }

  DOM.parent.classList.remove("wishlist-page__toggle-min-width");

  const markup = products
    .map((product) => {
      return `
    <div class="wishlist-page__item">
        <div class="wishlist-page__product">
        <a href="#" class="wishlist-page__link">
            <img
            src="${product.image}"
            alt="Grifo"
            />
            <span>${product.title}</span>
        </a>
        </div>

        <div class="wishlist-page__price">
        <span class="wishlist-page__price-label">Price</span>
        <span>$ ${product.priceFormatted}</span>
        </div>

        <button class="btn btn--secondary wishlist-page__add-btn"  data-id=${product.id}>Add to cart</button>

         <button class="wishlist-page__remove-btn" data-id=${product.id}>
            <svg class="icon">
            <use href="${icons}#icon-bin2"></use>
            </svg>
        </button>
    </div>
    `;
    })
    .join("");

  DOM.container.innerHTML = markup;
};

// Remove from wishlist
export const handleRemoveItem = function (handler) {
  DOM.container.addEventListener("click", function (e) {
    const btn = e.target.closest(".wishlist-page__remove-btn");
    if (!btn) return;

    const id = btn.dataset.id;
    handler(id);
  });
};

// Add to cart
export const handleAddToCart = function (handler) {
  DOM.container.addEventListener("click", function (e) {
    const btn = e.target.closest(".wishlist-page__add-btn");
    if (!btn) return;

    const id = btn.dataset.id;
    handler(id);
  });
};

// Add & Remove wishlist
export const handleWishlistActions = function (handler) {
  DOM.container.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".wishlist-page__remove-btn");
    const addBtn = e.target.closest(".wishlist-page__add-btn");

    if (removeBtn) handler("remove", removeBtn.dataset.id);
    if (addBtn) handler("add", addBtn.dataset.id);
  });
};
