import { initHeader } from "./headerController";
import { renderTemplate } from "../views/baseView";

export const createStaticPageController = function (templateId) {
  return function () {
    renderTemplate(templateId);
    initHeader();
  };
};
