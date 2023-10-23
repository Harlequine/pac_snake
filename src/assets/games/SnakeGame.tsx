
import "./SnakeGame.css"

type inputs = {
  inputKey: string
}

const SnakeGame = (props:inputs) => {
  const { inputKey } = props


  return (
    <div className="game">{inputKey}</div>
  )
}

export default SnakeGame