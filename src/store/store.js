import {configureStore} from "@reduxjs/toolkit";

import resultReducer from "../components/resultSlice";

export default configureStore({
    reducer: {
        result: resultReducer
    }
})