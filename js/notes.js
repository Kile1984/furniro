get cart() {
  return this.#cart;
}

get wishlist() {
  return this.#wishlist;
}

isInWishlist(id) {
  return this.#wishlist.some(p => p.id === id);
}