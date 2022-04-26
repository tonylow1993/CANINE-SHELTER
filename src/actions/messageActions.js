import axios from 'axios'
import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
} from '../constants/messageConstants'

export const listMessage = (dogId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    
    dispatch({ type: MESSAGE_LIST_REQUEST })

    const { data } = await axios.get(`/api/messages/${dogId}`, config)

    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMessage = (dogId, message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_MESSAGE_REQUEST,
    })

    const { data } = await axios.post(`/api/messages/${dogId}`, message, {})

    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload: message,
    })
  }
}