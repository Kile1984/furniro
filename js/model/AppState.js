import { PRODUCTS } from "./products";
class AppState {
  constructor() {
    const data = JSON.parse(localStorage.getItem("wishlist"));
    this.#wishlist = data || [];
  }

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

  get cart() {
    return this.#cart;
  }

  get wishlist() {
    return this.#wishlist;
  }

  get products() {
    return this.#products;
  }

  get product() {
    return this.#product;
  }

  get account() {
    return this.#account;
  }

  #persistWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(this.#wishlist));
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
    const index = this.#wishlist.findIndex((p) => p.id === id);

    if (index !== -1) {
      this.#wishlist.splice(index, 1);
    } else {
      const product = this.getProductById(id);
      if (!product) return;

      this.#wishlist.push(product);
    }

    this.#persistWishlist();
  }

  isInWishlist(id) {
    return this.#wishlist.some((p) => p.id === id);
  }

  deleteProductInWishList(id) {
    console.log(id);
  }
}

export const appState = new AppState();
