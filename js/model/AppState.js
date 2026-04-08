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

  get cartSubtotal() {
    return this.cartProducts.reduce((acc, p) => acc + p.subtotal, 0);
  }

  get cartShipping() {
    return this.cartSubtotal > 300 ? 0 : 20;
  }

  get cartTax() {
    return this.cartSubtotal * 0.1;
  }

  get cartTotal() {
    if (this.cartSubtotal === 0) return 0;
    return this.cartSubtotal + this.cartShipping + this.cartTax;
  }

  get cartProducts() {
    return this.#cart
      .map((item) => {
        const product = this.getProductById(item.id);

        if (!product) return null;

        const price = product.price.current;
        const quantity = item.quantity;

        return {
          id: item.id,
          title: product.title,
          price: price,
          priceFormatted: this.formatPrice(price),
          image: product.images.main,
          quantity: quantity,
          subtotalFormatted: this.formatPrice(price * quantity),
          subtotal: product.price.current * item.quantity,
        };
      })
      .filter(Boolean);
  }

  get wishlist() {
    return this.#wishlist;
  }

  get wishlistProducts() {
    return this.#wishlist
      .map((id) => {
        const product = this.getProductById(id);
        if (!product) return null;

        const price = Number(product.price.current);

        return {
          id: product.id,
          title: product.title,
          image: product.images.main,
          price,
          priceFormatted: this.formatPrice(price),
        };
      })
      .filter(Boolean);
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

  formatPrice(value) {
    return `$ ${value.toFixed(2)}`;
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
      this.#wishlist.push(id);
    }

    this.#persist("wishlist", this.#wishlist);
  }

  isInWishlist(id) {
    return this.#wishlist.some((pId) => pId === id);
  }

  moveToCartFromWishlist(id) {
    const product = appState.getProductById(id);
    if (!product) return;
    this.addToCart(product);
    this.removeFromWishlist(product.id);
  }

  removeFromWishlist(id) {
    this.#wishlist = this.#wishlist.filter((pId) => pId !== id);
    this.#persist("wishlist", this.#wishlist);
  }
}

export const appState = new AppState();
