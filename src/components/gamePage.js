import {shuffledArray} from "../data/data.js";
import {useState} from "react";

export const GamePage = () => {
    const [show, setShow] = useState({isShow: false, indexes: [], winnerId: []});
    const handleClick = (index) => {
        if(show.indexes.length === 2){
            return console.log("limit")
        }
        if(show.isShow && shuffledArray[show.indexes[0]].id === shuffledArray[index].id){
            return setShow({isShow: false, indexes: [], winnerId: [...show.winnerId, shuffledArray[index].id]})
        }
        else if(show.isShow && shuffledArray[show.indexes[0]].id !== shuffledArray[index].id){
            setTimeout(function(){ setShow({...show, isShow: false, indexes: []}) }, 2000)
        }
        setShow({...show, isShow: true, indexes: [...show.indexes, index]});
    }
    return(
        <div className="game-page">
            {shuffledArray.map((item, index) => {
                return <div key={index} className={`${item.code} single-card ${show.isShow && show.indexes.includes(index) && "show-card"} ${show.winnerId.includes(item.id) && "winner-card"}`}
                            onClick={() => handleClick(index)}></div>
            })}
        </div>
    )
}