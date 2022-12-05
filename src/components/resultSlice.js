import {createSlice} from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: "result",
    initialState: null,
    reducers: {
        getFinalResult(state, action){
            return state = action.payload;
        }
    }
})

export default resultSlice.reducer;