import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {Timer} from "../components/timer";
import {shuffledArray1, shuffledArray2, shuffledArray3} from "../data/data.js";

const initialState = {
    show: {isShow: false, indexes: [], winnerId: []},
    countMoves: 0,
    stars: [1, 1, 1],
    time: {minute: 1, second: 0}
}

export const GamePage = () => {
    const [state, setState] = useState(initialState);
    const [shuffledArray, setShuffledArray] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const level = useSelector(state => state.game.level);
    useEffect(() => {
        setShuffledArray(level === "Easy" ? shuffledArray1() : level === "Medium" ? shuffledArray2() : shuffledArray3())
    }, [level])// Whenever GamePage mounts, array calls again
    const handleReload = () => {
        setState(initialState);
        setShuffledArray(level === "Easy" ? shuffledArray1() : level === "Medium" ? shuffledArray2() : shuffledArray3())
    }
    const handleClick = (e, index) => {
        if(state.show.indexes.length === 2 || state.show.indexes[0] === index){
            return
        }
        if(state.show.isShow && shuffledArray[state.show.indexes[0]].id === shuffledArray[index].id){
            const audio = new Audio("/TCD25PS-game-success.mp3");
            audio.volume = 0.3;
            audio.play().then();
            let indexOfZero = state.stars.indexOf(0);
            let newStars = [...state.stars];
            newStars[indexOfZero] = 1;
            return setState({...state, stars: newStars, countMoves: state.countMoves + 1, show: {isShow: false, indexes: [], winnerId: [...state.show.winnerId, shuffledArray[index].id]}})
        }
        else if(state.show.isShow && shuffledArray[state.show.indexes[0]].id !== shuffledArray[index].id){
            let indexOfOne = state.stars.lastIndexOf(1);
            let newStars = [...state.stars];
            newStars[indexOfOne] = 0;
            setTimeout(function(){ setState({ time: {...state.time, second: state.time.second - 1}, stars: newStars, countMoves: state.countMoves + 1, show: {...state.show, isShow: false, indexes: []}}) }, 1000)
        }
        setState({...state, show: {...state.show, isShow: true, indexes: [...state.show.indexes, index]}});
    }

    useEffect(() => {
        const length = state.show.winnerId.length;
        if((length === 8 && level === "Easy") || (length === 10 && level === "Medium") || (length === 14 && level === "Hard")){
            setTimeout(() => {
                dispatch({type: "game/getFinalResult",
                    payload: {second: 60 - state.time.second, moves: state.countMoves, stars: state.stars.filter(item => item === 1).length}})
                navigate('/result')
            }, 1000)
        }// eslint-disable-next-line
    }, [state.show.winnerId.length])

    useEffect(() => {
        let address = "";
        if(level === "Easy" || level === "Medium"){
            address = "/Fluffing-a-Duck.mp3"
        }
        else{
            address = "/Powerful-Trap-.mp3"
        }
        const audio = new Audio(address);
        audio.volume = 0.5;
        audio.loop = true;
        audio.play().then();
        return () => audio.pause()
    },[level])

    return(
        <>
            <h2 className="title">Matching Game</h2>
            <div className="d-flex justify-content-around align-items-center mx-auto fw-bold fs-5 info-bar">
                <span><button onClick={() => navigate("/")} className="bg-transparent border-0 fw-bold" title="Change level">&#x21bb;</button>
                    Level: <span style={{color: level === "Hard" ? "red" : level === "Medium" ? "blue" : "green"}} className={level === "Hard" && "hard-anima"}>{level}</span>
                </span>
                <div className="d-flex">
                    {state.stars.map((item, index) => {
                        return <span key={index} className={`${item === 1 ? "big-star" : "small-star"} me-1`}>&#9733;</span>
                    })}
                </div>
                <i>{state.countMoves} Moves</i>
                <Timer time={state.time} setState={setState} initialState={initialState} />
                <span role="button" onClick={handleReload} title="Restart this game">&#x21bb;</span>
            </div>
            <div className={`game-box ${state.time.second < 10 && state.time.minute === 0 && "danger-box"} ${level === "Easy" ? "game-box1" : level === "Medium" ? "game-box2" : "game-box3"}`}>
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