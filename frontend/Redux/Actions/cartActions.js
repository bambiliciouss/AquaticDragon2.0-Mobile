import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../Constants";

export const addToCart = ({ item, quantity, price }) => {
  console.log(item);
  return {
    type: ADD_TO_CART,
    payload: {
      gallon: item._id,
      image: item.gallonImage.url,
      age: item.gallonAge,
      type: item.type,
      quantity,
      price,
    },
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
