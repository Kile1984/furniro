import icons from "url:../../assets/icons/sprite.svg";
console.log(icons);
export const container = document.querySelector(".products__grid");

export const generateMarkup = function (products) {
  const markup = products
    .map((product) => {
      const hasDiscount = product.price.discountPercent > 0;
      const isNew = product.badges.isNew;
      let badge = "";

      if (hasDiscount) {
        badge = `<span class="product-card__badge product-card__badge--red"
                  >-${product.price.discountPercent}%</span`;
      } else if (isNew) {
        badge = ` <span class="product-card__badge product-card__badge--green"
                  >NEW</span`;
      }
      return `<article class="product-card">
              <a href="product.html" class="product-card__stretched-link"></a>
              <div class="product-card__overlay">
                <button
                  type="button"
                  class="btn btn--secondary product-card__btn"
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
                  <button type="button" class="product-card__action">
                   <svg class="icon">
                     <use 
                      href="${icons}#icon-heart">
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
                    hasDiscount
                      ? `<span class="product-card__price-old">$${product.price.original}</span>`
                      : ""
                  }
                 
                </div>
              </div>
            </article>`;
    })
    .join("");

  container.insertAdjacentHTML("afterbegin", markup);
};
