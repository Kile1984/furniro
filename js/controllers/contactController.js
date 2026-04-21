import { initHeader } from "./headerController.js";
import { renderTemplate } from "../views/baseView.js";

function contactController() {
  renderTemplate("contact");
  initHeader();
}
export default contactController;
