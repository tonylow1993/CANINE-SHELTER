import axios from 'axios'
import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_REMOVE_ITEM,
} from '../constants/favouriteConstants'

export const addToFavourite = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/dogs/${id}`)

  dispatch({
    type: FAVOURITE_ADD_ITEM,
    payload: {
      dog: data._id,
      name: data.name,
      image: data.image,
      year: data.year,
      qty,
    },
  })

  localStorage.setItem('favouriteItems', JSON.stringify(getState().favourite.favouriteItems))
}

export const removeFromFavourite = (id) => (dispatch, getState) => {
  dispatch({
    type: FAVOURITE_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('favouriteItems', JSON.stringify(getState().favourite.favouriteItems))
}