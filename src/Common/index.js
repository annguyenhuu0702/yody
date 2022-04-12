export const castToVND = (price) => {
  if (!price) return;
  price = price.toLocaleString("vi", { style: "currency", currency: "VND" });
  return price;
};

export const convertSizeStringToNumber = (size) => {
  switch (size) {
    case "XS":
      return 0;
    case "S":
      return 1;
    case "M":
      return 2;
    case "L":
      return 3;
    case "XL":
      return 4;
    case "2XL":
      return 5;
    case "3XL":
      return 6;
    case "4XL":
      return 8;
    case "29":
      return 9;
    case "30":
      return 10;
    case "31":
      return 11;
    case "39":
      return 12;
    case "40":
      return 13;
    case "41":
      return 14;
    default:
      return -1;
  }
};
