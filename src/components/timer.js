import {useEffect} from "react";

export const Timer = ({time, setTime}) => {
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

    return <span>{time.minute < 10 && "0"}{time.minute} : {time.second < 10 && "0"}{time.second}</span>
}