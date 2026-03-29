import { appState } from "./model/AppState.js";
import { generateMarkup } from "./views/productWiew.js";

generateMarkup(appState.products);
