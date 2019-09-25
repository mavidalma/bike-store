import { BIKE_FILTERS } from '../constants';
import * as TYPES from './types';

const initialState = {
  bikes: [],
  bikesFilter: BIKE_FILTERS.ALL,
  cart: {},
};

const updateItem = (items, updatedId, update) => {
  return items.map(item => {
    if (item.id === updatedId) {
      return {
        ...item,
        ...update(item),
      };
    }
    return item;
  });
};

export function bikes(state = initialState.bikes, action) {
  switch (action.type) {
    case TYPES.SET_BIKES:
      return action.bikes;

    case TYPES.ADD_TO_CART:
      return updateItem(state, action.itemId, item => ({
        stock: item.stock - action.quantity,
      }));

    case TYPES.REMOVE_FROM_CART:
      return updateItem(state, action.itemId, item => ({
        stock: item.stock + action.quantity,
      }));

    default:
      return state;
  }
}

export function bikesFilter(state = initialState.bikesFilter, action) {
  switch (action.type) {
    case TYPES.SET_BIKES_FILTER:
      return action.bikesFilter;

    default:
      return state;
  }
}

export function cart(state = initialState.cart, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART:
      return {
        ...state,
        [action.itemId]: (state[action.itemId] || 0) + action.quantity,
      };

    case TYPES.REMOVE_FROM_CART:
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;

    case TYPES.CHECKOUT_CART:
      return initialState.cart;

    default:
      return state;
  }
}
