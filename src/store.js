import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  dogListReducer,
  dogDetailsReducer,
  dogDeleteReducer,
  dogCreateReducer,
  dogUpdateReducer,
  dogTopRatedReducer,
} from './reducers/dogReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  favouriteDogListReducer,
  favouriteReducer,
} from './reducers/favouriteReducers'
import {
  messageListReducer,
} from './reducers/messageReducers'

const reducer = combineReducers({
  dogList: dogListReducer,
  favouriteDogList: favouriteDogListReducer,
  dogDetails: dogDetailsReducer,
  dogDelete: dogDeleteReducer,
  dogCreate: dogCreateReducer,
  dogUpdate: dogUpdateReducer,
  dogTopRated: dogTopRatedReducer,
  favouriteList: favouriteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  messageList: messageListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  favouriteList: { favourites: [] },
  userLogin: { userInfo: userInfoFromStorage },
  userDetails: {},
  messageList: { messages: [] },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
