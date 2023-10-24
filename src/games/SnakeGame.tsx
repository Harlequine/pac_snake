
import { useEffect, useState} from "react"
import { useInterval } from "usehooks-ts"
import "./SnakeGame.css"

type Dpad = {
  inputKey: string
}


const createBoard = (boardSize:number) => {
  let counter = 0;
  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const currentRow = [];
    for (let col = 0; col < boardSize-5; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
}


const SnakeGame = (props:Dpad) => {
  const [ snake, setSnake ] = useState([24,12,0]);
  const [ head, setHead ] = useState(snake[0]);
  const [ board, setBoard ] = useState(createBoard(17));
  const [ direction, setDirection ] = useState(12) 
  const [ fruit, setFruit ] = useState([54, 94, 114, 120, 83])
  const [ gameOver, isGameOver ] = useState(false);
  const { inputKey } = props


  useEffect(() => {

  },[])

  useInterval(
    () => {
      const snakeHolder = [...snake];
      if(!fruit.includes(head)){
        snakeHolder.pop();
      }
      if(fruit.includes(head)){
        setFruit(() => fruit.filter(fruit => fruit !== head))
        
      }
  
      snakeHolder.unshift(head+direction);
      setSnake(snakeHolder);
      
    },
    gameOver ? null : 100,
  )

  useEffect(() => {
    setHead(snake[0]);
  },[snake,setSnake])

  useEffect(() => {
    if(inputKey === 'w' || inputKey === 'ArrowUp'){
      setDirection(-1)
    }

    else if(inputKey === 'a' || inputKey === 'ArrowLeft'){
      setDirection(-12)
    }
    else if(inputKey === 's' || inputKey === 'ArrowDown'){
      setDirection(1)
    }

    else if(inputKey === 'd' || inputKey === 'ArrowRight'){
      setDirection(12)
    }
    

  },[inputKey])

  return (
    <div className="game">
      <div className="board">
      {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {
              return <div key={cellIdx} className={`cell ${snake.includes(cellValue) ? cellValue === head ? 'snake-head' : 'snake' : ''} ${fruit.includes(cellValue) ? 'fruit' : ''}`}>{cellValue}</div>;
            })}
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default SnakeGame