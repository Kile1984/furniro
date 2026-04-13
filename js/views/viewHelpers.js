export const renderEmpty = function (container, message) {
  container.innerHTML = `
   <div class="cart-page__empty">
      <span class="text-body-xl">!!! ${message} !!!</span><a class="btn btn--primary" href="shop.html">Got to products</a>
    </div>
  `;
};
