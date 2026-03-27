class AppState {
  #products = [];
  #account = null;
  #wishlist = [];
  #cart = [];
  #product = null;
  #comparison = [];
  #grid = {
    mobile: 2,
    desktop: 4,
  };
  #itemsPerPage = 16;
  #sortBy = "default";

  get product() {
    return this.#product;
  }

  get products() {
    return this.#products;
  }

  get account() {
    return this.#account;
  }

  getProductById(id) {
    return this.#products.find((prod) => prod.id === id);
  }

  addToCart(product) {
    const existing = this.#cart.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.#cart.push({ ...product, quantity: 1 });
    }
  }

  toggleWishList(product) {
    const existing = this.#wishlist.find((p) => p.id === product.id);

    if (existing) {
      this.#wishlist = this.#wishlist.filter((p) => p.id !== product.id);
    } else {
      this.#wishlist.push(product);
    }
  }

  isWishList(id) {
    return this.#wishlist.some((p) => p.id === id);
  }

  get cart() {
    return this.#cart;
  }

  get wishlist() {
    return this.#wishlist;
  }
}
