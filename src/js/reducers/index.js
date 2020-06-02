import { combineReducers } from "redux";
import auth from "./auth";
import restaurant from "./restaurant";
import toast from "./toast";

export default combineReducers({ auth, restaurant, toast });
