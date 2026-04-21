import { initHeader } from "./headerController.js";
import { renderTemplate } from "../views/baseView.js";

function aboutController() {
  renderTemplate("about");
  initHeader();
}

export default aboutController;
