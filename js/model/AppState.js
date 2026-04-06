import { PRODUCTS } from "./products";
class AppState {
  constructor() {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist"));
    this.#wishlist = wishlistData || [];

    const cartData = JSON.parse(localStorage.getItem("cart"));
    this.#cart = cartData || [];
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
  // NASTAVI OVDE
  get wishlistProduct() {
    const pr = this.#wishlist.map((id) => this.getProductById(id));
    console.log(this.#wishlist);
    return this.#wishlist.map((id) => this.getProductById(id));
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

  get cartItemsCount() {
    return this.#cart.reduce((acc, p) => acc + p.quantity, 0);
  }

  #persist(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getProductById(id) {
    return this.#products.find((prod) => prod.id === id);
  }

  addToCart(product) {
    const existing = this.#cart.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.#cart.push({
        id: product.id,
        title: product.title,
        price: product.price.current,
        image: product.images.main,
        quantity: 1,
      });
    }

    this.#persist("cart", this.#cart);
  }

  removeFromCart(id) {
    this.#cart = this.#cart.filter((p) => p.id !== id);
    this.#persist("cart", this.#cart);
  }

  updateQuantity(id, act) {
    const product = this.#cart.find((p) => p.id === id);
    if (!product) return;

    const delta = act === "increment" ? 1 : -1;

    if (product.quantity + delta < 1) {
      this.removeFromCart(id);
    } else {
      product.quantity += delta;
    }

    this.#persist("cart", this.#cart);
  }

  toggleWishList(id) {
    const index = this.#wishlist.findIndex((pId) => pId === id);

    if (index !== -1) {
      this.#wishlist.splice(index, 1);
    } else {
      const product = this.getProductById(id);
      if (!product) return;

      this.#wishlist.push(id);
    }

    this.#persist("wishlist", this.#wishlist);
  }

  isInWishlist(id) {
    return this.#wishlist.some((pId) => pId === id);
  }

  removeFromWishlist(id) {
    this.#wishlist = this.#wishlist.filter((productId) => productId !== id);
    this.#persist("wishlist", this.#wishlist);
  }
}

export const appState = new AppState();
