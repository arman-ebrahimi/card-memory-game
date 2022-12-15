import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

import {Timer} from "../components/timer";
import {shuffledArray} from "../data/data.js";

const initialState = {
    show: {isShow: false, indexes: [], winnerId: []},
    countMoves: 0,
    stars: [1, 1, 1],
    time: {minute: 1, second: 0}
}

export const GamePage = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleReload = () => {
        setState(initialState);
    }
    const handleClick = (e, index) => {
        if(state.show.indexes.length === 2 || state.show.indexes[0] === index){
            return
        }
        if(state.show.isShow && shuffledArray[state.show.indexes[0]].id === shuffledArray[index].id){
            let indexOfZero = state.stars.indexOf(0);
            let newStars = [...state.stars];
            newStars[indexOfZero] = 1;
            return setState({...state, stars: newStars, countMoves: state.countMoves + 1, show: {isShow: false, indexes: [], winnerId: [...state.show.winnerId, shuffledArray[index].id]}})
        }
        else if(state.show.isShow && shuffledArray[state.show.indexes[0]].id !== shuffledArray[index].id){
            let indexOfOne = state.stars.lastIndexOf(1);
            let newStars = [...state.stars];
            newStars[indexOfOne] = 0;
            setTimeout(function(){ setState({ time: {...state.time, second: state.time.second - 2}, stars: newStars, countMoves: state.countMoves + 1, show: {...state.show, isShow: false, indexes: []}}) }, 2000)
        }
        setState({...state, show: {...state.show, isShow: true, indexes: [...state.show.indexes, index]}});
    }

    useEffect(() => {
        if(state.show.winnerId.length === 8){
            setTimeout(() => {
                dispatch({type: "result/getFinalResult",
                    payload: {minute: state.time.minute, second: 60 - state.time.second, moves: state.countMoves, stars: state.stars.filter(item => item === 1).length}})
                navigate('/result')
            }, 1000)
        }// eslint-disable-next-line
    }, [state.show.winnerId.length])

    return(
        <>
            <h1>Matching Game</h1>
            <div className="d-flex justify-content-around align-items-center w-25 mx-auto fw-bold fs-5">
                <div className="d-flex">
                    {state.stars.map((item, index) => {
                        return <span id="star" key={index} className={`${item === 1 ? "anima1" : "anima2"} me-1 fs-5`}>&#9733;</span>
                    })}
                </div>
                <span>{state.countMoves} Moves</span>
                <Timer time={state.time} setState={setState} initialState={initialState} />
                <span className="fs-3" role="button" onClick={handleReload}>&#x21bb;</span>
            </div>
            <div className="game-box">
                {shuffledArray.map((item, index) => {
                    return(
                        <div key={index} className={`${item.code} single-card ${state.show.isShow && state.show.indexes.includes(index) && "show-card"} ${state.show.winnerId.includes(item.id) && "winner-card"}`}
                             onClick={(e) => handleClick(e, index)}></div>
                    )
                })}
            </div>
        </>
    )
}