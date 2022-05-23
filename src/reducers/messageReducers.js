import {
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  REPLY_MESSAGE_REQUEST,
  REPLY_MESSAGE_SUCCESS,
  REPLY_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
} from '../constants/messageConstants'

export const messageListReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST:
      return { loading: true, messages: [] }
    case MESSAGE_LIST_SUCCESS:
      return {
        loading: false,
        messages: action.payload.messages,
      }
    case MESSAGE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case REPLY_MESSAGE_REQUEST:
      return { loading: true, messages: state.messages }
    case REPLY_MESSAGE_SUCCESS:
      return {
        loading: false,
        messages: state.messages.map(message => {
          if (message._id === action.payload.message._id) {
            return action.payload.message
          }
          return message
        })
      }
    case REPLY_MESSAGE_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_MESSAGE_REQUEST:
      return { loading: true, messages: state.messages }
    case DELETE_MESSAGE_SUCCESS:
      console.log(action.payload)
      if (action.payload.messageId) {
        return {
          loading: false,
          messages: state.messages.filter(message => message._id !== action.payload.messageId),
        }
      } else if (action.payload.message) {
        return {
          loading: false,
          messages: state.messages.map(message => {
            if (message._id === action.payload.message._id) {
              return action.payload.message
            }
            return message
          }),
        }
      }
      return state
    case DELETE_MESSAGE_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_MESSAGE_REQUEST:
      return { loading: true, messages: state.messages }
    case CREATE_MESSAGE_SUCCESS:
      console.log(action.payload)
      return {
        loading: false,
        messages: [...state.messages, action.payload.message],
      }
    case CREATE_MESSAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
