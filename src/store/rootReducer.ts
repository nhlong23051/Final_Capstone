import { combineReducers } from "redux";
import { loginReducer } from "../page/LoginTemplate/duck/reducer";
import { getAllProductReducer } from "../page/HomePageTemplate/Project/duck/reducer";
import { registerReducer } from "../page/RegisterTemplate/duck/reducer";
import { getAllUserReducer } from "../page/HomePageTemplate/User/duck/reducer";
import { createProjectReducer } from "../page/HomePageTemplate/CreateProject/duck/reducer";
import { detailProjectReducer } from "../page/HomePageTemplate/DetailProject/duck/reducer";
import { modalCreateTaskReducer } from "../page/HomePageTemplate/CreateTask/duck/reducer";
import { editProjectReducer } from "../page/HomePageTemplate/EditProject/duck/reducer";
import { updateTaskReducer } from "../page/HomePageTemplate/UpdateTask/duck/reducer";

export const rootReducer = combineReducers({
    loginReducer,
    getAllProductReducer,
    registerReducer,
    getAllUserReducer,
    createProjectReducer,
    detailProjectReducer,
    modalCreateTaskReducer,
    editProjectReducer,
    updateTaskReducer
});
