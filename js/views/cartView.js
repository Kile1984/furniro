import icons from "url:../../assets/icons/sprite.svg";

const DOM = {
  container: document.querySelector(".cart-page__item-wrapp"),
  subtotal: document.querySelector(".cart-page__summary-price--subtotal"),
  total: document.querySelector(".cart-page__summary-price--total"),
  items: document.querySelector(".cart-page__items"),
};

export const renderCart = function (products) {
  if (products.length === 0) {
    DOM.container.innerHTML = `
    <div class="cart-page__empty"><span class="text-body-xl">!!! Cart is empty !!!</span><a class="btn btn--primary" href="shop.html">Got to products</a></div>
    `;
    DOM.items.classList.add("cart-page__toggle-min-width");
    return;
  }

  DOM.items.classList.remove("cart-page__toggle-min-width");

  const markup = products
    .map((p) => {
      console.log(p);
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
            <span>${p.priceFormatted}</span>
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
            <span> ${p.subtotalFormatted}</span>
            </div>

            <button class="cart-page__remove-btn" data-id=${p.id}>
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

export const handleRemoveFromCart = function (handler) {
  DOM.container.addEventListener("click", function (e) {
    const btn = e.target.closest(".cart-page__remove-btn");

    if (!btn) return;

    const id = btn.dataset.id;
    handler(id);
  });
};

export const handleQuantity = function (handler) {
  DOM.container.addEventListener("click", function (e) {
    const btn = e.target.closest(".cart-page__quantity-btn");

    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    handler(id, action);
  });
};

export const updateCartSubtotal = function (value) {
  console.log(value);
  if (!DOM.subtotal) return;

  DOM.subtotal.textContent = `$ ${value}`;
};

export const updateTotal = function (value) {
  console.log(value);
  if (!DOM.total) return;

  DOM.total.textContent = `$ ${value}`;
};
