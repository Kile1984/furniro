// Delegation
export const delegate = function (parent, event, selector, callback) {
  parent.addEventListener(event, function (e) {
    let el;

    if (event === "input" || event === "change") {
      if (!e.target.matches(selector)) return;
      el = e.target;
    } else {
      el = e.target.closest(selector);
      if (!el) return;
    }

    callback(el, e);
  });
};
