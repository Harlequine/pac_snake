
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
  const board = createBoard(17)
  const [ snake, setSnake ] = useState([24,12,0]);
  const [ head, setHead ] = useState(snake[0]);
  
  const [ direction, setDirection ] = useState(12) 
  const [ fruit, setFruit ] = useState(114)
  const [ isGameOver, setIsGameOver ] = useState(false);
  const [ columnCounter, setColumnCounter ] = useState(0);
  const { inputKey } = props


  useInterval(
    () => {
      const move = moveToDirection(inputKey)
      const snakeHolder = [...snake];

      if(move === 0){
        if(direction === 1 || direction === -1)
          setColumnCounter(columnCounter+1)
        else setColumnCounter(0)
        
        snakeHolder.unshift(head+direction);
      }
      else{
        if(move === 1 || move === -1)
          setColumnCounter(columnCounter+1)
        else setColumnCounter(0)
        
        snakeHolder.unshift(head+move);
        setDirection(move)
      }

      if(snakeAteFruit() === false){
        snakeHolder.pop();
      }
      setSnake(snakeHolder);
    },
    isGameOver ? null : 150,
  )

  useEffect(() => {
    setHead(snake[0]);
  },[snake,setSnake])

  useEffect(() => {
    if(snake.length !== new Set(snake).size || isOutOfBounds(head)){//check
      setSnake([])
      setIsGameOver(true);
    }
  },[head, columnCounter])

  const isOutOfBounds = (head) => {
    if(head > 203 || head < 0)
      return true
    return false;
  }

  const moveToDirection = (inputKey:string):number => {
    if(inputKey === 'w' || inputKey === 'ArrowUp'){
      if(direction !== 1)
        return -1
    }

    else if(inputKey === 'a' || inputKey === 'ArrowLeft'){
      if(direction !== 12)
        return -12
    }
    else if(inputKey === 's' || inputKey === 'ArrowDown'){
      if(direction !== -1)
        return 1
    }

    else if(inputKey === 'd' || inputKey === 'ArrowRight'){
      if(direction !== -12)
        return 12
    }
    return 0
  }

  const snakeAteFruit = () => {
    if(fruit === head){
      setFruit(-10)
      return true;
    }
    return false;
  }



  return (
    <div className="game">
      <div className="board">
      {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {
              return <div key={cellIdx} className={`cell ${snake.includes(cellValue) ? cellValue === head ? 'snake-head' : 'snake' : ''} ${fruit === cellValue ? 'fruit' : ''}`}>{cellValue}</div>;
            })} 
          </div>
        ))}
      </div>
      
    </div>
  ) 
}

export default SnakeGame