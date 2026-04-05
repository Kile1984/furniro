import icons from "url:../../assets/icons/sprite.svg";

const container = document.querySelector(".products__grid");
const wishListCount = document.querySelector(".header__count");
const cartCount = document.querySelector(".header__count-cart");

// Render products
export const renderProducts = function (products) {
  const generateBadge = function (product) {
    const hasDiscount = product.price.discountPercent > 0;
    const isNew = product.badges.isNew;

    if (hasDiscount) {
      return `<span class="product-card__badge product-card__badge--red"
                  >-${product.price.discountPercent}%</span`;
    } else if (isNew) {
      return ` <span class="product-card__badge product-card__badge--green"
                  >NEW</span`;
    }

    return "";
  };

  const markup = products
    .map((product) => {
      let badge = generateBadge(product);

      return `<article class="product-card">
              <a href="product.html" class="product-card__stretched-link"></a>
              <div class="product-card__overlay">
                <button
                  type="button"
                  class="btn btn--secondary product-card__btn"
                  data-id=${product.id}
                >
                  Add to cart
                </button>

                <a
                  href="product.html"
                  class="btn btn--outline product-card__view"
                >
                  View details
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
                  <button type="button" class="product-card__action product-card__action--like" data-id=${product.id}>
                   <svg class="icon">
                     <use 
                      href="${icons}#${product.isWishlisted ? "icon-heart1" : "icon-heart"}">
                    </use>
                    </svg>
                    <span>Like</span>
                  </button>
                </div>
              </div>

              <div class="product-card__image-wrapper">
                <img
                  src="${product.images.main}"
                  alt="${product.title}"
                  class="product-card__image"
                />
               ${badge}
              </div>

              <div class="product-card__content">
                <h3 class="product-card__title">${product.title}</h3>
                <p class="product-card__description">${product.shortDescription}</p>
                <div class="product-card__price">
                  <span class="product-card__price-current">$ ${product.price.current}</span>
                  ${
                    product.price.discountPercent > 0
                      ? `<span class="product-card__price-old">$${product.price.original}</span>`
                      : ""
                  }
                 
                </div>
              </div>
            </article>`;
    })
    .join("");

  container.innerHTML = markup;
};

// Wishlist toggle
export const handleToggleWishList = function (handler) {
  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".product-card__action--like");
    if (!btn) return;
    const id = btn.dataset.id;
    handler(id, btn);
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

// Wishlist counter
export const updateWishListCount = function (count) {
  wishListCount.textContent = count;
  wishListCount.classList.toggle("hidden", count === 0);
};

// Cart counter
export const updateCartCount = function (count) {
  cartCount.textContent = count;
  console.log(count);
  cartCount.classList.toggle("hidden", count === 0);
};

// Add product to cart
export const handleAddToCart = function (handler) {
  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".product-card__btn");
    if (!btn) return;

    const id = btn.dataset.id;
    handler(id);
  });
};
