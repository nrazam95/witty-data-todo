import { combineReducers } from "redux";
import auth from "./auth-reducers";
import myProfile from "./my-profile-reducers";
import todo from "./todo-reducers";

export default combineReducers({
  auth,
  myProfile,
  todo,
});