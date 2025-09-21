import { useState } from 'react'
import './App.css'

const JavascriptCalculator = () => {
  const [input, setInput] = useState('0')
  const [evaluated, setEvaluated] = useState(false) // track if "=" was pressed

  const isOperator = (char) => ['+', '-', '*', '/'].includes(char)

  const handleButtonClick = (value) => {
    // If last evaluation was done and user clicks a number -> reset input
    if (evaluated && !isOperator(value) && value !== '.') {
      setInput(value)
      setEvaluated(false)
      return
    }

    setInput((prev) => {
      // Handle leading zeros
      if (prev === '0' && value !== '.' && !isOperator(value)) {
        return value
      }

      // Handle decimals (prevent two in same number)
      if (value === '.') {
        // Split by operators to get current number
        const parts = prev.split(/[-+*/]/)
        const lastNumber = parts[parts.length - 1]
        if (lastNumber.includes('.')) {
          return prev // ignore second decimal
        }
      }

      // Handle consecutive operators (except minus for negatives)
      if (isOperator(value)) {
      let newInput = prev

      // If previous char is operator
      if (isOperator(prev[prev.length - 1])) {
      // Case: last operator is not "-" → replace it
      if (value !== '-') {
      // Replace all trailing operators with the new one
      newInput = prev.replace(/[+\-*/]+$/, '') + value
      return newInput
      }
      // Case: minus allowed → only allow if not already "--"
      else if (prev[prev.length - 1] !== '-') {
        return prev + value
      }
      return prev // prevent multiple "--"
    }
  }

      return prev + value
    })
    setEvaluated(false)
  }

  const handleClear = () => {
    setInput('0')
    setEvaluated(false)
  }

  const handleEvaluate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input)
      setInput(result.toString())
      setEvaluated(true)
    } catch (error) {
      setInput('Error')
      setEvaluated(true)
    }
  }

  return (
    <div className="calculator" id="calculator">
      <div className="display" id="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" onClick={() => handleButtonClick('/')}>/</button>
        <button id="multiply" onClick={() => handleButtonClick('*')}>*</button>
        <button id="seven" onClick={() => handleButtonClick('7')}>7</button>
        <button id="eight" onClick={() => handleButtonClick('8')}>8</button>
        <button id="nine" onClick={() => handleButtonClick('9')}>9</button>
        <button id="subtract" onClick={() => handleButtonClick('-')}>-</button>
        <button id="four" onClick={() => handleButtonClick('4')}>4</button>
        <button id="five" onClick={() => handleButtonClick('5')}>5</button>
        <button id="six" onClick={() => handleButtonClick('6')}>6</button>
        <button id="add" onClick={() => handleButtonClick('+')}>+</button>
        <button id="one" onClick={() => handleButtonClick('1')}>1</button>
        <button id="two" onClick={() => handleButtonClick('2')}>2</button>
        <button id="three" onClick={() => handleButtonClick('3')}>3</button>
        <button id="equals" onClick={handleEvaluate}>=</button>
        <button id="zero" onClick={() => handleButtonClick('0')}>0</button>
        <button id="decimal" onClick={() => handleButtonClick('.')}>.</button>
      </div>
    </div>
  )
}

export default JavascriptCalculator