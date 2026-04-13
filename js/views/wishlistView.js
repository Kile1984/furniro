import icons from "url:../../assets/icons/sprite.svg";
import { formatPrice } from "../utils/format.js";
import { delegate } from "../utils/delegate.js";
import { renderEmpty } from "./viewHelpers.js";

const DOM = {
  container: document.querySelector(".wishlist-page__item-wrapp"),
  parent: document.querySelector(".wishlist-page__items"),
};

const generateWishlistMarkup = function (p) {
  return `
    <div class="wishlist-page__item">
        <div class="wishlist-page__product">
        <a href="#" class="wishlist-page__link">
            <img
            src="${p.image}"
            alt="${p.title}"
            />
            <span>${p.title}</span>
        </a>
        </div>

        <div class="wishlist-page__price">
        <span class="wishlist-page__price-label">Price</span>
        <span> ${formatPrice(p.price)}</span>
        </div>

        <button class="btn btn--secondary wishlist-page__add-btn"  data-id=${p.id}>Add to cart</button>

         <button class="wishlist-page__remove-btn" data-id=${p.id}>
            <svg class="icon">
            <use href="${icons}#icon-bin2"></use>
            </svg>
        </button>
    </div>
    `;
};

export const renderWishlistItems = function (p) {
  if (p.length === 0) {
    renderEmpty(DOM.container, "Wishlist is empty");
    DOM.parent.classList.add("wishlist-page__toggle-min-width");
    return;
  }

  DOM.parent.classList.remove("wishlist-page__toggle-min-width");

  const markup = p.map(generateWishlistMarkup).join("");

  DOM.container.innerHTML = markup;
};

export const handleWishlistActions = function (handler) {
  delegate(DOM.container, "click", ".wishlist-page__remove-btn", (el) => {
    handler("remove", el.dataset.id);
  });

  delegate(DOM.container, "click", ".wishlist-page__add-btn", (el) => {
    handler("add", el.dataset.id);
  });
};
