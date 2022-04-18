import axios from 'axios'
import {
  UPDATE_FAVOURITE_REQUEST,
  UPDATE_FAVOURITE_SUCCESS,
  UPDATE_FAVOURITE_FAIL,
  FAVOURITE_DOG_LIST_REQUEST,
  FAVOURITE_DOG_LIST_SUCCESS,
  FAVOURITE_DOG_LIST_FAIL,
} from '../constants/favouriteConstants'
import {
  USER_DETAILS_SUCCESS,
} from '../constants/userConstants'

export const listFavouriteDogs = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const userData = await axios.get(`/api/users/${userInfo._id}`, config)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: userData.data })

    dispatch({ type: FAVOURITE_DOG_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/dogs?ids=${userData.data.favourites}`
    )

    dispatch({
      type: FAVOURITE_DOG_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FAVOURITE_DOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addUserFavourite = (userId, dogId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/users/${userId}/favourite/${dogId}`, {}, config)

    dispatch({ type: UPDATE_FAVOURITE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: UPDATE_FAVOURITE_FAIL,
      payload: message,
    })
  }
}

export const deleteUserFavourite = (userId, dogId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/users/${userId}/favourite/${dogId}`, config)

    dispatch({ type: UPDATE_FAVOURITE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: UPDATE_FAVOURITE_FAIL,
      payload: message,
    })
  }
}