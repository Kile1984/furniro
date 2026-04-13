export const formatPrice = function (value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
