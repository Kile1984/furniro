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
  #shippingThreshold = 300;
  #shippingCost = 20;
  #taxRate = 0.1;

  #getDiscountedPrice(product) {
    const original = Number(product.price.original);
    const discount = Number(product.price.discountPercent);

    return original * (1 - discount / 100);
  }

  #getProductBadge(product) {
    if (product.price.discountPercent > 0) {
      return {
        type: "discount",
        value: `-${product.price.discountPercent}%`,
      };
    } else if (product.badges.isNew) {
      return {
        type: "new",
        value: "NEW",
      };
    }

    return null;
  }

  // CART
  get cart() {
    return this.#cart;
  }

  get cartItemsCount() {
    return this.#cart.reduce((acc, p) => acc + p.quantity, 0);
  }

  get cartProducts() {
    return this.#cart
      .map((item) => {
        const product = this.getProductById(item.id);

        if (!product) return null;

        const price = this.#getDiscountedPrice(product);

        const quantity = item.quantity;

        return {
          id: item.id,
          title: product.title,
          price: price,
          image: product.images.main,
          quantity: quantity,
          subtotal: price * quantity,
        };
      })
      .filter(Boolean);
  }

  get cartSubtotal() {
    return this.cartProducts.reduce((acc, p) => acc + p.subtotal, 0);
  }

  get cartShipping() {
    const subtotal = this.cartSubtotal;
    if (subtotal === 0) return 0;

    return this.cartSubtotal > this.#shippingThreshold ? 0 : this.#shippingCost;
  }

  get cartTax() {
    return this.cartSubtotal * this.#taxRate;
  }

  get cartTotal() {
    const subtotal = this.cartSubtotal;

    if (subtotal === 0) return 0;
    return subtotal + this.cartShipping + this.cartTax;
  }

  getCartItemUI(id) {
    return this.cartProducts.find((p) => p.id === id) || null;
  }

  isInCart(id) {
    return this.#cart.some((p) => p.id === id);
  }

  getCartItem(id) {
    return this.#cart.find((p) => p.id === id);
  }

  isCartEmpty() {
    return this.cart.length === 0;
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

  updateQuantity(id, qt) {
    const product = this.getCartItem(id);
    if (!product) return;

    if (!Number.isFinite(qt) || qt < 1) {
      this.removeFromCart(id);
      return;
    }

    product.quantity = qt;

    this.#persist("cart", this.#cart);
  }

  moveToCartFromWishlist(id) {
    const product = this.getProductById(id);

    if (!product) return;

    this.addToCart(product);
    this.removeFromWishlist(product.id);
  }

  // WISHLIST
  get wishlist() {
    return this.#wishlist;
  }

  get wishlistProducts() {
    return this.#wishlist
      .map((id) => {
        const product = this.getProductById(id);
        if (!product) return null;

        const price = this.#getDiscountedPrice(product);

        return {
          id: product.id,
          title: product.title,
          image: product.images.main,
          price,
        };
      })
      .filter(Boolean);
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

  removeFromWishlist(id) {
    this.#wishlist = this.#wishlist.filter((pId) => pId !== id);
    this.#persist("wishlist", this.#wishlist);
  }

  // PRODUCTS
  get products() {
    return this.#products;
  }

  get product() {
    return this.#product;
  }

  getProductById(id) {
    return this.#products.find((prod) => prod.id === id);
  }

  get enrichedProducts() {
    return this.#products.map((product) => {
      const price = this.#getDiscountedPrice(product);
      const badge = this.#getProductBadge(product);

      return {
        id: product.id,
        title: product.title,
        image: product.images.main,
        shortDescription: product.shortDescription,
        price,
        originalPrice: product.price.original,
        discountPercent: product.price.discountPercent,
        badge,
        isNew: product.badges.isNew,
        isWishlisted: this.isInWishlist(product.id),
        isInCart: this.isInCart(product.id),
      };
    });
  }

  // ACCOUNT
  get account() {
    return this.#account;
  }

  // LOCAL STORAGE
  #persist(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const appState = new AppState();
