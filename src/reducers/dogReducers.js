import {
  DOG_LIST_REQUEST,
  DOG_LIST_SUCCESS,
  DOG_LIST_FAIL,
  DOG_DETAILS_REQUEST,
  DOG_DETAILS_SUCCESS,
  DOG_DETAILS_FAIL,
  DOG_DELETE_REQUEST,
  DOG_DELETE_SUCCESS,
  DOG_DELETE_FAIL,
  DOG_CREATE_RESET,
  DOG_CREATE_FAIL,
  DOG_CREATE_SUCCESS,
  DOG_CREATE_REQUEST,
  DOG_UPDATE_REQUEST,
  DOG_UPDATE_SUCCESS,
  DOG_UPDATE_FAIL,
  DOG_UPDATE_RESET,
  DOG_TOP_REQUEST,
  DOG_TOP_SUCCESS,
  DOG_TOP_FAIL,
} from '../constants/dogConstants'

export const dogListReducer = (state = { dogs: [] }, action) => {
  switch (action.type) {
    case DOG_LIST_REQUEST:
      return { loading: true, dogs: [] }
    case DOG_LIST_SUCCESS:
      return {
        loading: false,
        dogs: action.payload.dogs,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case DOG_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dogDetailsReducer = (
  state = { dog: { } },
  action
) => {
  switch (action.type) {
    case DOG_DETAILS_REQUEST:
      return { ...state, loading: true }
    case DOG_DETAILS_SUCCESS:
      return { loading: false, dog: action.payload }
    case DOG_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOG_DELETE_REQUEST:
      return { loading: true }
    case DOG_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DOG_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOG_CREATE_REQUEST:
      return { loading: true }
    case DOG_CREATE_SUCCESS:
      return { loading: false, success: true, dog: action.payload }
    case DOG_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case DOG_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const dogUpdateReducer = (state = { dog: {} }, action) => {
  switch (action.type) {
    case DOG_UPDATE_REQUEST:
      return { loading: true }
    case DOG_UPDATE_SUCCESS:
      return { loading: false, success: true, dog: action.payload }
    case DOG_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DOG_UPDATE_RESET:
      return { dog: {} }
    default:
      return state
  }
}

export const dogTopRatedReducer = (state = { dogs: [] }, action) => {
  switch (action.type) {
    case DOG_TOP_REQUEST:
      return { loading: true, dogs: [] }
    case DOG_TOP_SUCCESS:
      return { loading: false, dogs: action.payload }
    case DOG_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
