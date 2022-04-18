import {
  UPDATE_FAVOURITE_REQUEST,
  UPDATE_FAVOURITE_SUCCESS,
  UPDATE_FAVOURITE_FAIL,
  FAVOURITE_DOG_LIST_REQUEST,
  FAVOURITE_DOG_LIST_SUCCESS,
  FAVOURITE_DOG_LIST_FAIL,
} from '../constants/favouriteConstants'

export const favouriteDogListReducer = (state = { favouriteDogs: [] }, action) => {
  switch (action.type) {
    case FAVOURITE_DOG_LIST_REQUEST:
      return { loading: true, favouriteDogs: [] }
    case FAVOURITE_DOG_LIST_SUCCESS:
      return {
        loading: false,
        favouriteDogs: action.payload.dogs,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case FAVOURITE_DOG_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
} 

export const favouriteReducer = (state = { favourites: [] }, action) => {
  switch (action.type) {
    case UPDATE_FAVOURITE_REQUEST:
      return { loading: true }
    case UPDATE_FAVOURITE_SUCCESS:
      return { 
        loading: false, 
        favourites: action.payload.favourites,
        success: true,
      }
    case UPDATE_FAVOURITE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
