import { appState } from "../model/AppState.js";
import {
  renderWishlistItems,
  handleWishlistActions,
} from "../views/wishlistView.js";
import { updateHeader } from "./headerController.js";

const renderUI = function () {
  renderWishlistItems(appState.wishlistProducts);
  updateHeader();
};

const controlWishlist = function (type, id) {
  if (type === "remove") {
    appState.removeFromWishlist(id);
  } else if (type === "add") {
    appState.moveToCartFromWishlist(id);
  }

  renderUI();
};

function init() {
  renderUI();
  handleWishlistActions(controlWishlist);
}

init();
