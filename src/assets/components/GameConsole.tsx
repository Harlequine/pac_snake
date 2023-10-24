import React, { useEffect, useState } from 'react'
import SnakeGame from '../games/SnakeGame'

import './GameConsole.css'

const GameConsole = () => {
  const [ inputKey, setInputKey ] = useState("");
  // const timeoutRef = useRef<unknown>(null) ;
  
  useEffect(() => {
    window.addEventListener('keyup', e => {
      handleKeyPress(e);
    });
  }, []);

  const handleKeyPress = (e: { key: React.SetStateAction<string> }) => {
    setInputKey(e.key);
    // if (!timeoutRef.current) {
    //   setInputKey(e.key);

    //   timeoutRef.current = setTimeout(() => {
    //     timeoutRef.current = null;
    //   }, 0);
    // }
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