// import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../assets/styles/Mover.scss'


export const TextMover = () => {
    let [executeTimer, setExecuteTimer] = useState(true);
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        if(executeTimer){
        let interval = setInterval(() => {
            let sliderElement = document.getElementById('slider');
            let sliderWidth = sliderElement.clientWidth;
            
            setCounter(counter + 1);
            if(counter === 100){
                document.getElementById("slider").style.animationPlayState = "running"; 
            }
            if(sliderWidth >= sliderElement.scrollWidth) {
                setExecuteTimer(false);
                document.getElementById("slider").style.animationPlayState = "paused"; 
            }
            
            },10);
        return () => clearInterval(interval);
        }
    }, [executeTimer, counter]);
   
    return (
        <div className="slider" id="slider-container">
        {/* <h2 id="slider">Hello world, I need a very long text to show how the text will move. We need this text to be just a little bit (that means a small acount) larger</h2> */}
        {/* <h2 id="slider">Hello world</h2> */}
        <h2 id="slider">Hello world, this is just a little bit longer; no it needs to be just a little bit longer</h2>
        </div>
    );
};

export default TextMover;