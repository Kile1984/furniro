import icons from "url:../../assets/icons/sprite.svg";
import { formatPrice } from "../utils/format.js";
import { delegate } from "../utils/delegate.js";

const DOM = {
  container: document.querySelector(".products__grid"),
  wishListCount: document.querySelector(".header__count"),
  cartCount: document.querySelector(".header__count-cart"),
};

// Generate product markup
const generateProductMarkup = function (p) {
  let badge = generateBadge(p);

  return `<article class="product-card">
              <a href="product.html" class="product-card__stretched-link"></a>
              <div class="product-card__overlay">
                <button
                  type="button"
                 
                 
                class="btn product-card__btn ${p.isInCart ? "btn--secondary" : "btn--primary"}"
                  data-id="${p.id}"
                >
                  ${p.isInCart ? "Remove from cart" : "Add to cart"} 
                </button>

                <a
                  href="product.html"
                  class="btn  product-card__view"
                >
                <svg class="icon">
                     <use href="${icons}#icon-eye"></use>
                  </svg>
                </a>

                <div class="product-card__actions">
                  <button type="button" class="product-card__action">
                    <svg class="icon">
                      <use href="${icons}#icon-share2"></use>
                    </svg>
                    <span>Share</span>
                  </button>
                  <button type="button" class="product-card__action">
                    <svg class="icon">
                      <use href="${icons}#icon-tab"></use>
                    </svg>
                    <span>Compare</span>
                  </button>
                  <button type="button" class="product-card__action product-card__action--like" data-id=${p.id}>
                   <svg class="icon">
                     <use 
                      href="${icons}#${p.isWishlisted ? "icon-heart1" : "icon-heart"}">
                    </use>
                    </svg>
                    <span>Like</span>
                  </button>
                </div>
              </div>

              <div class="product-card__image-wrapper">
                <img
                  src="${p.image}"
                  alt="${p.title}"
                  class="product-card__image"
                />
               ${badge}
              </div>

              <div class="product-card__content">
                <h3 class="product-card__title">${p.title}</h3>
                <p class="product-card__description">${p.shortDescription}</p>
                <div class="product-card__price">
                  <span class="product-card__price-current">${formatPrice(p.price)}</span>
                  ${
                    p.discountPercent > 0
                      ? `<span class="product-card__price-old">${formatPrice(p.originalPrice)}</span>`
                      : ""
                  }
                 
                </div>
              </div>
            </article>`;
};

// Generate badge
const generateBadge = function (p) {
  if (!p.badge) return "";

  return `<span class="product-card__badge product-card__badge--${p.badge.type}">${p.badge.value}</span`;
};

// Render products
export const renderProducts = function (products) {
  const markup = products.map(generateProductMarkup).join("");

  DOM.container.innerHTML = markup;
};

// Handle cart click
export const handleCartClick = function (handler) {
  delegate(DOM.container, "click", ".product-card__btn", (el) => {
    const id = el.dataset.id;
    handler(id);
  });
};

// Button state
export const handleCartButtonState = function (id, isInCart) {
  const btn = document.querySelector(`.product-card__btn[data-id="${id}"]`);

  if (!btn) return;

  btn.textContent = `${isInCart ? "Remove from cart" : "Add to cart"}`;
  btn.classList.toggle("btn--secondary", isInCart);
  btn.classList.toggle("btn--primary", !isInCart);
};

// Wishlist toggle
export const handleToggleWishList = function (handler) {
  delegate(DOM.container, "click", ".product-card__action--like", (el) => {
    const id = el.dataset.id;
    handler(id, el);
  });
};

// Wishlist icon
export const updateWishListIcon = function (btn, isActive) {
  const useEl = btn.querySelector("use");

  useEl.setAttribute(
    "href",
    `${icons}#${isActive ? "icon-heart1" : "icon-heart"}`,
  );
  btn.classList.toggle("wishlist", isActive);
};
