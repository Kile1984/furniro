import { PRODUCTS } from "./products";
class AppState {
  #products = PRODUCTS;
  #account = null;
  #wishlist = [
    {
      id: "p1",
      title: "Aurelia Chair",
      category: "chair",

      price: {
        current: 120,
        original: 160,
        discountPercent: 25,
      },

      badges: {
        isNew: false,
      },

      images: {
        main: new URL(
          "../../assets/images/products/chairs/chair-01/chair-01-1.png",
          import.meta.url,
        ).href,
        gallery: [
          new URL(
            "../../assets/images/products/chairs/chair-01/chair-01-2.png",
            import.meta.url,
          ).href,
          new URL(
            "../../assets/images/products/chairs/chair-01/chair-01-3.png",
            import.meta.url,
          ).href,
          new URL(
            "../../assets/images/products/chairs/chair-01/chair-01-4.png",
            import.meta.url,
          ).href,
        ],
      },

      shortDescription: "Soft comfort with modern design",

      properties: {
        salesPackage: "1 Chair",
        modelNumber: "AUR-CHR-01",
        secondaryMaterial: "Metal",
        configuration: "Straight",
        fillingMaterial: "Foam",
        maximumLoadCapacity: "120 kg",
        originOfManufacture: "Serbia",
        dimensions: {
          width: "60 cm",
          height: "85 cm",
          depth: "55 cm",
          weight: "8 kg",
        },
        warrantySummary: "1 Year Manufacturer Warranty",
      },

      isWishlisted: false,
    },
  ];
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
    const index = this.#wishlist.findIndex((p) => p.id === id);

    if (index !== -1) {
      this.#wishlist.splice(index, 1);
    } else {
      const product = this.getProductById(id);
      if (!product) return;

      this.#wishlist.push(product);
    }
  }

  isInWishlist(id) {
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
