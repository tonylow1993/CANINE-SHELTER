import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_REMOVE_ITEM,
  FAVOURITE_CLEAR_ITEMS,
} from '../constants/favouriteConstants'

export const favouriteReducer = (
  state = { favouriteItems: [] },
  action
) => {
  switch (action.type) {
    case FAVOURITE_ADD_ITEM:
      const item = action.payload

      const existItem = state.favouriteItems.find((x) => x.dog === item.dog)

      if (existItem) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((x) =>
            x.dog === existItem.dog ? item : x
          ),
        }
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        }
      }
    case FAVOURITE_REMOVE_ITEM:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter((x) => x.dog !== action.payload),
      }
    case FAVOURITE_CLEAR_ITEMS:
      return {
        ...state,
        favouriteItems: [],
      }
    default:
      return state
  }
}
