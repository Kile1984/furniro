import { appState } from "./model/AppState.js";
import {
  generateMarkup,
  handleToggleWishList,
  updateWishListIcon,
} from "./views/productWiew.js";

generateMarkup(appState.products);

const controllToggleWishList = function (id, btn) {
  appState.toggleWishList(id);

  const isActive = appState.isWishList(id);

  updateWishListIcon(btn, isActive);
};

function init() {
  handleToggleWishList(controllToggleWishList);
}

init();
