import {
  homeController,
  shopController,
} from "./controllers/productsController.js";
import { createStaticPageController } from "./controllers/staticController.js";

// ROUTES
const routes = {
  "/": homeController,
  "/shop": shopController,
  "/about": createStaticPageController("about"),
  "/contact": createStaticPageController("contact"),
  "/payment": createStaticPageController("paymant"),
  "/returns": createStaticPageController("returns"),
  "/policy": createStaticPageController("policy"),
};

// PARSE URL
function parseUrl() {
  const path = window.location.hash.slice(1) || "/";
  const segments = path.split("/").filter(Boolean);

  return {
    route: segments.length === 0 ? "/" : `/${segments[0]}`,
    params: { id: segments[1] || null },
  };
}

// ROUTER
function router() {
  const { route, params } = parseUrl();
  const handler = routes[route];

  if (!handler) {
    console.error("Route not found", route);
    return;
    // notFoundController();
  }

  handler(params);
}

// NAVIGATION
export function navigate(path) {
  window.location.hash = path;
}

// INIT ROUTER
export function initRouter() {
  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);
}
