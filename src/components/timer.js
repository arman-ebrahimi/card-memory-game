import {useEffect, useState} from "react";

export const Timer = () => {
    const [time, setTime] = useState({minute: 0, second: 0})
    useEffect(() => {
        let Int = setInterval(function (){
            if(time.second === 59){
                setTime({minute: time.minute + 1, second: 0})
            }
            else{
                setTime({...time, second: time.second + 1})
            }
        }, 1000)
        return () => clearInterval(Int)
    })

    return <p>{time.minute < 10 && "0"}{time.minute} : {time.second < 10 && "0"}{time.second}</p>
}