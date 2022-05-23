import axios from 'axios'
import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  REPLY_MESSAGE_REQUEST,
  REPLY_MESSAGE_SUCCESS,
  REPLY_MESSAGE_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
} from '../constants/messageConstants'

export const listMessage = (dogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_LIST_REQUEST })

    const { data } = await axios.get(`/api/messages/${dogId}`, {})

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

export const replyMessage = (messageId, reply) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    
    dispatch({
      type: REPLY_MESSAGE_REQUEST,
    })

    const { data } = await axios.post(`/api/messages/reply/${messageId}`, { reply }, config)

    dispatch({ type: REPLY_MESSAGE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: REPLY_MESSAGE_FAIL,
      payload: message,
    })
  }
}

export const deleteMessage = (messageId, index) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    
    dispatch({
      type: DELETE_MESSAGE_REQUEST,
    })

    const { data } = await axios.delete(`/api/messages/${messageId}/${index}`, config)

    dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: DELETE_MESSAGE_FAIL,
      payload: message,
    })
  }
}