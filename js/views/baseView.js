import { DOM } from "./dom.js";
const app = DOM.app();

export function renderTemplate(templateId) {
  const template = document.querySelector(`#${templateId}`);
  const clone = template.content.cloneNode(true);

  app.innerHTML = "";
  app.appendChild(clone);
}
