import {shuffledArray} from "../data/data.js";
import {useState} from "react";
import {Timer} from "../components/timer";

export const GamePage = () => {
    const [show, setShow] = useState({isShow: false, indexes: [], winnerId: []});
    const [countMoves, setCount] = useState(0);
    const [stars, setStars] = useState([1, 1, 1])
    const handleClick = (index) => {
        if(show.indexes.length === 1){
            setCount(countMoves + 1)
        }
        if(show.indexes.length === 2){
            return console.log("limit")
        }
        if(show.isShow && shuffledArray[show.indexes[0]].id === shuffledArray[index].id){
            return setShow({isShow: false, indexes: [], winnerId: [...show.winnerId, shuffledArray[index].id]})
        }
        else if(show.isShow && shuffledArray[show.indexes[0]].id !== shuffledArray[index].id){
            let indexOfStar = stars.lastIndexOf(1);
            let newStars = stars;
            newStars[indexOfStar] = 0;
            setStars(newStars);
            setTimeout(function(){ setShow({...show, isShow: false, indexes: []}) }, 2000)
        }
        setShow({...show, isShow: true, indexes: [...show.indexes, index]});
    }
    return(
        <>
            <h1>Matching Game</h1>
            <div className="d-flex justify-content-around text-white w-25 mx-auto fw-bold fs-5">
                <div className="d-flex">
                    {stars.map((item, index) => {
                        return <span key={index} className={`${stars[index] === 1 ? "text-black" : "text-white"} me-1`}>&#9733;</span>
                    })}
                </div>
                <span>{countMoves} Moves</span>
                <Timer />
            </div>
            <div className="game-box">
                {shuffledArray.map((item, index) => {
                    return <div key={index} className={`${item.code} single-card ${show.isShow && show.indexes.includes(index) && "show-card"} ${show.winnerId.includes(item.id) && "winner-card"}`}
                                onClick={() => handleClick(index)}></div>
                })}
            </div>
        </>
    )
}