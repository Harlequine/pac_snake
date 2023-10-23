import React, { useEffect, useRef, useState } from 'react'
import SnakeGame from '../games/SnakeGame'

import './GameConsole.css'





const GameConsole = () => {
  const [ inputKey, setInputKey ] = useState("");
  const timeoutRef = useRef<unknown>(null) ;
  
  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress, true);

    return () => {
      document.removeEventListener('keyup', handleKeyPress, true);
    };
  }, []);

  const handleKeyPress = (e: { key: React.SetStateAction<string> }) => {
    /**
     * TODO: multiple key input at the same time will not be proccessed.
     *        can do combo (ex: A+S, W+D etc... as long as it is right angle 90deg)
     *        invalid input(A+D, W+S etc....)
     */
    if (!timeoutRef.current) {
      setInputKey(e.key);

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 0);
    }
  };

  
  
  return (
    <div id='game-console' >
        <div className="console-body">
          <div className="console-screen">
              <SnakeGame inputKey={inputKey}/>
          </div>
          <div className="btn-section">
            <div className="dpad-wrapper">
              <div className="up-direction" >
                <div className="arrow"></div>
              </div>
              <div className="right-direction">
                <div className="arrow"></div>
              </div>
              <div className="center"></div>
              <div className="down-direction">
                <div className="arrow"></div>
              </div>
              <div className="left-direction">
                <div className="arrow"></div>
              </div>
            </div>
            <div className="ab-btn">
              <div className="a-btn">
                <h1>A</h1>
              </div>
              <div className="b-btn">
                <h1>B</h1>
              </div>
            </div>
          </div>
          <div className="ss-btns"></div>
        </div>
    </div>
  )
}

export default GameConsole