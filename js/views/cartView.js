import { DOM } from "./dom.js";
import icons from "url:../../assets/icons/sprite.svg";
import { formatPrice } from "../utils/format.js";
import { delegate } from "../utils/delegate.js";
import { renderEmpty } from "./viewHelpers.js";

const generateCartMarkup = function (p) {
  return `
      <div class="cart-page__item" data-id="${p.id}">
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
      <span class="cart-page__subtotal-value"> ${formatPrice(p.subtotal)}</span>
    
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
  const container = DOM.cart.container();
  const items = DOM.cart.items();
  if (!container) return;

  if (products.length === 0) {
    renderEmpty(container, "Cart is empty");

    if (items) {
      items.classList.add("cart-page__toggle-min-width");
    }

    return;
  }

  if (items) {
    items.classList.remove("cart-page__toggle-min-width");
  }

  const markup = products.map(generateCartMarkup).join("");

  container.innerHTML = markup;
};

export const handleQuantity = function (handler) {
  const container = DOM.cart.container();
  if (!container) return;

  delegate(container, "click", ".cart-page__quantity-btn", (el) => {
    const { id, action } = el.dataset;

    handler(id, action);
  });
};

export const updateCartQuantity = function (id, value) {
  const container = DOM.cart.container();
  if (!container) return;

  const input = container.querySelector(
    `.cart-page__quantity-input[data-id="${id}"]`,
  );

  if (!input) return;

  input.value = value;
};

export const handleRemoveFromCart = function (handler) {
  const container = DOM.cart.container();
  if (!container) return;

  delegate(container, "click", ".cart-page__remove-btn", (el) => {
    const id = el.dataset.id;

    handler(id);
  });
};

export const removeItem = function (id) {
  const container = DOM.cart.container();
  if (!container) return;

  const item = container.querySelector(`.cart-page__item[data-id="${id}"]`);

  if (item) item.remove();
};

export const updateItemSubtotal = function (id, value) {
  const container = DOM.cart.container();
  if (!container) return;

  const item = container.querySelector(`.cart-page__item[data-id="${id}"]`);

  const subtotalEl = item?.querySelector(".cart-page__subtotal-value");

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(value);
  }
};

export const updateSummary = function (summary) {
  if (!summary) return;

  const container = DOM.cart.container();
  if (!container) return;

  const { subtotal, total, tax, shipping } = summary;

  const setText = (el, value) => el && (el.textContent = value);

  setText(DOM.cart.subtotal(), formatPrice(subtotal));

  setText(DOM.cart.subtotal(), formatPrice(subtotal));
  setText(DOM.cart.total(), formatPrice(total));
  setText(DOM.cart.tax(), formatPrice(tax));
  setText(DOM.cart.shipping(), formatPrice(shipping));
};

export const handleInputQuantity = function (handler) {
  const container = DOM.cart.container();
  if (!container) return;

  delegate(container, "change", ".cart-page__quantity-input", (el) => {
    const id = el.dataset.id;
    const quantity = el.value;

    handler(id, quantity);
  });
};
