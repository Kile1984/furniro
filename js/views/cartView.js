import icons from "url:../../assets/icons/sprite.svg";
import { formatPrice } from "../utils/format.js";
import { delegate } from "../utils/delegate.js";
import { renderEmpty } from "./viewHelpers.js";

const DOM = {
  container: document.querySelector(".cart-page__item-wrapp"),
  subtotal: document.querySelector(".cart-page__summary-price--subtotal"),
  total: document.querySelector(".cart-page__summary-price--total"),
  items: document.querySelector(".cart-page__items"),
  tax: document.querySelector(".cart-page__summary-price--tax"),
  shipping: document.querySelector(".cart-page__summary-price--shipping"),
  input: document.querySelector(".cart-page__quantity-input"),
};

const generateCartMarkup = function (p) {
  return `
      <div class="cart-page__item">
      <div class="cart-page__product">
      <a href="#" class="cart-page__link">
          <img
          src="${p.image}"
          alt="${p.title}"
          />
          <span>${p.title}</span>
      </a>
      </div>

      <div class="cart-page__price">
      <span class="cart-page__price-label">Price</span>
      <span>${formatPrice(p.price)}</span>
      </div>

      <div class="cart-page__quantity">
      <button
          type="button"
          class="btn cart-page__quantity-btn cart-page__quantity-btn--decrement"
          data-id=${p.id}
          data-action="decrement"
          
      >
          -
      </button>

      <input
          type="number"
          min="1"
          value=${p.quantity}
          class="cart-page__quantity-input"
          data-id=${p.id}
      />

      <button
          type="button"
          class="btn cart-page__quantity-btn cart-page__quantity-btn--increment"
          data-id=${p.id}
          data-action="increment"
      >
          +
      </button>
      </div>

      <div class="cart-page__subtotal">
      <span class="cart-page__price-label">Subtotal</span>
      <span> ${formatPrice(p.subtotal)}</span>
    
      </div>

      <button class="cart-page__remove-btn" data-id=${p.id}>
      <svg class="icon">
          <use href="${icons}#icon-bin2"></use>
      </svg>
      </button>
  </div>
    `;
};

export const renderCart = function (products) {
  if (products.length === 0) {
    renderEmpty(DOM.container, "Cart is empty");

    DOM.items.classList.add("cart-page__toggle-min-width");

    return;
  }

  DOM.items.classList.remove("cart-page__toggle-min-width");

  const markup = products.map(generateCartMarkup).join("");

  DOM.container.innerHTML = markup;
};

export const handleQuantity = function (handler) {
  delegate(DOM.container, "click", ".cart-page__quantity-btn", (el) => {
    const id = el.dataset.id;
    const action = el.dataset.action;

    handler(id, action);
  });
};

export const handleInputQuantity = function (handler) {
  delegate(DOM.container, "change", ".cart-page__quantity-input", (el) => {
    const id = el.dataset.id;
    const quantity = el.value;

    handler(id, quantity);
  });
};

export const handleRemoveFromCart = function (handler) {
  delegate(DOM.container, "click", ".cart-page__remove-btn", (el) => {
    const id = el.dataset.id;

    handler(id);
  });
};

export const updateSummary = function (type, value) {
  const el = DOM[type];

  if (!el) return;

  el.textContent = formatPrice(value);
};

export const handleInputValue = function (handler) {
  delegate(DOM.container, "change", ".cart-page__quantity-input", (el) => {
    const id = el.dataset.id;
    const value = el.value;

    handler(id, value);
  });
};
