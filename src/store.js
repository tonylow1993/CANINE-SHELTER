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
import { favouriteReducer } from './reducers/favouriteReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  dogList: dogListReducer,
  dogDetails: dogDetailsReducer,
  dogDelete: dogDeleteReducer,
  dogCreate: dogCreateReducer,
  dogUpdate: dogUpdateReducer,
  dogTopRated: dogTopRatedReducer,
  favourite: favouriteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const favouriteItemsFromStorage = localStorage.getItem('favouriteItems')
  ? JSON.parse(localStorage.getItem('favouriteItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  favourite: {
    favouriteItems: favouriteItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
