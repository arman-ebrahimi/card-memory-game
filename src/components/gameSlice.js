import {createSlice} from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {result: null, level: ""},
    reducers: {
        getFinalResult(state, action){
            state.result = action.payload;
        },
        gameLevel(state, action){
            state.level = action.payload;
        }
    }
})

export default gameSlice.reducer;