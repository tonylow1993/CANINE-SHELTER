import axios from 'axios'
import {
  DOG_LIST_REQUEST,
  DOG_LIST_SUCCESS,
  DOG_LIST_FAIL,
  DOG_DETAILS_REQUEST,
  DOG_DETAILS_SUCCESS,
  DOG_DETAILS_FAIL,
  DOG_DELETE_SUCCESS,
  DOG_DELETE_REQUEST,
  DOG_DELETE_FAIL,
  DOG_CREATE_REQUEST,
  DOG_CREATE_SUCCESS,
  DOG_CREATE_FAIL,
  DOG_UPDATE_REQUEST,
  DOG_UPDATE_SUCCESS,
  DOG_UPDATE_FAIL,
  DOG_TOP_REQUEST,
  DOG_TOP_SUCCESS,
  DOG_TOP_FAIL,
} from '../constants/dogConstants'
import { logout } from './userActions'

export const listDogs = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: DOG_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/dogs?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: DOG_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listDogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOG_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/dogs/${id}`)

    dispatch({
      type: DOG_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDog = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOG_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/dogs/${id}`, config)

    dispatch({
      type: DOG_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DOG_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createDog = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOG_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/dogs`, {}, config)

    dispatch({
      type: DOG_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DOG_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateDog = (dog) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOG_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/dogs/${dog._id}`,
      dog,
      config
    )

    dispatch({
      type: DOG_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: DOG_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DOG_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const listTopDogs = () => async (dispatch) => {
  try {
    dispatch({ type: DOG_TOP_REQUEST })

    const { data } = await axios.get(`/api/dogs/top`)

    dispatch({
      type: DOG_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOG_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
