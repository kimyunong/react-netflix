import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";



let store = configureStore({

    reducer : {

        movies : movieReducer

    }

})

export default store;