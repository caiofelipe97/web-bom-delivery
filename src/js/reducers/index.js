import { combineReducers } from "redux";
import auth from "./auth";
import restaurant from "./restaurant";
import toast from "./toast";
import item from "./item";

export default combineReducers({ auth, restaurant, toast, item });
