import {useEffect} from "react";
import swal from 'sweetalert';

export const Timer = ({time, setState, initialState}) => {

    useEffect(() => {
        let Int = setInterval(function (){
            if(time.minute === 0 && time.second === 0){
                return swal({
                    title: "Time Over",
                    text: "Time is finished! You can play again, by pressing button.",
                    icon: "error",
                    button: "Play Again",
                    allowOutsideClick: false
                }).then(() => setState(initialState));
            }
            if(time.minute === 1){
                setState(prevState => ({...prevState, time: {minute: 0, second: 59}}))
            }
            else{
                setState(prevState => ({...prevState, time: {...time, second: time.second - 1}}))
            }
        }, 1000)
        return () => clearInterval(Int)
        // eslint-disable-next-line
    }, [time.second, time.minute])

    return <span className={time.minute === 0 && time.second < 10 && "text-danger time-over"}>{time.minute < 10 && "0"}{time.minute} : {time.second < 10 && "0"}{time.second}</span>
}