import {configureStore} from "@reduxjs/toolkit";

import gameReducer from "../components/resultSlice";

export default configureStore({
    reducer: {
        game: gameReducer
    }
})