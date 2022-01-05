// import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../assets/styles/Mover.scss'


export const TextMover = (props) => {
    let [executeTimer, setExecuteTimer] = useState(true);
    let [counter, setCounter] = useState(0);
    let [a, setA] = useState(0);

    useEffect(() => {
        if(executeTimer){
        let interval = setInterval(() => {
            let sliderElement = document.getElementById('slider');
            
            setCounter(counter + 1);
            if(counter === 100){
                document.getElementById("slider").style.animationPlayState = "running"; 
            }
            
            // console.log("sliderWith: " + sliderElement.offsetWidth);
            // console.log("sliderElement.scrollWidth: " + sliderElement.scrollWidth);
            if(sliderElement.offsetWidth >= sliderElement.scrollWidth) {
                setExecuteTimer(false);
                document.getElementById("slider").style.animationPlayState = "paused"; 
                // document.getElementById("slider").style.animation = "none";
                // document.getElementById("slider").style.animation = "slide-left 30s"
            }
            
            },10);
        return () => clearInterval(interval);
        }
    }, [executeTimer, counter, a]);
   
    return (
        <div className="slider">
        {/* <h2 id="slider">Hello world, I need a very long text to show how the text will move. We need this text to be just a little bit (that means a small acount) larger</h2> */}
        {/* <h2 id="slider">Hello world</h2> */}
        <h2 id="slider">{props.text}</h2>
        </div>
    );
};

export default TextMover;