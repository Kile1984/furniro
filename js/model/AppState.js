import { PRODUCTS } from "./products";
class AppState {
  #products = PRODUCTS;
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

  get products() {
    return this.#products;
  }

  get product() {
    return this.#product;
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

  toggleWishList(id) {
    const existingId = this.#wishlist.find((p) => p.id === id);

    const product = this.products.find((p) => p.id === id);

    if (existingId) {
      this.#wishlist = this.#wishlist.filter((p) => p.id !== id);
    } else {
      this.#wishlist.push(product);
    }
  }

  isWishList(id) {
    return this.#wishlist.some((p) => p.id === id);
  }

  addWishListCount() {}

  get cart() {
    return this.#cart;
  }

  get wishlist() {
    return this.#wishlist;
  }
}

export const appState = new AppState();
