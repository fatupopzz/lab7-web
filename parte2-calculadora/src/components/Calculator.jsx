import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNew, setWaitingForNew] = useState(false);

  // Cuando se presiona un numero
  const handleNumber = (num) => {
    if (waitingForNew) {
      setDisplay(String(num));
      setWaitingForNew(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  // Punto decimal sin permitir mas de uno
  const handleDecimal = () => {
    if (waitingForNew) {
      setDisplay("0.");
      setWaitingForNew(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Operadores: +, -, *, /
  const handleOperator = (op) => {
    const current = parseFloat(display);

    if (previous === null) {
      setPrevious(current);
    } else if (operator) {
      const result = calculate(previous, current, operator);
      setDisplay(String(result));
      setPrevious(result);
    }

    setOperator(op);
    setWaitingForNew(true);
  };

  // Logica de operaciones basicas
  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? "Error" : a / b;
      default: return b;
    }
  };

  // Igual: ejecuta la operacion pendiente
  const handleEquals = () => {
    if (operator === null || previous === null) return;
    const current = parseFloat(display);
    const result = calculate(previous, current, operator);
    setDisplay(String(result));
    setPrevious(null);
    setOperator(null);
    setWaitingForNew(true);
  };

  // Limpiar todo
  const handleClear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNew(false);
  };

  // Borrar el ultimo digito
  const handleDelete = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Cambiar signo
  const handleSign = () => {
    if (display === "0" || display === "Error") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  return (
    <div className="calc-shell">
      <div className="calc-header">
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
        <span className="calc-title">calculadora</span>
      </div>

      <div className="calc-display">
        {operator && previous !== null && (
          <div className="calc-history">
            {previous} {operator}
          </div>
        )}
        <div className="calc-screen">{display}</div>
      </div>

      <div className="calc-keys">
        <button className="btn btn-fn" onClick={handleClear}>AC</button>
        <button className="btn btn-fn" onClick={handleSign}>+/-</button>
        <button className="btn btn-fn" onClick={handleDelete}>DEL</button>
        <button className="btn btn-op" onClick={() => handleOperator("/")}>÷</button>

        <button className="btn btn-num" onClick={() => handleNumber(7)}>7</button>
        <button className="btn btn-num" onClick={() => handleNumber(8)}>8</button>
        <button className="btn btn-num" onClick={() => handleNumber(9)}>9</button>
        <button className="btn btn-op" onClick={() => handleOperator("*")}>×</button>

        <button className="btn btn-num" onClick={() => handleNumber(4)}>4</button>
        <button className="btn btn-num" onClick={() => handleNumber(5)}>5</button>
        <button className="btn btn-num" onClick={() => handleNumber(6)}>6</button>
        <button className="btn btn-op" onClick={() => handleOperator("-")}>−</button>

        <button className="btn btn-num" onClick={() => handleNumber(1)}>1</button>
        <button className="btn btn-num" onClick={() => handleNumber(2)}>2</button>
        <button className="btn btn-num" onClick={() => handleNumber(3)}>3</button>
        <button className="btn btn-op" onClick={() => handleOperator("+")}>+</button>

        <button className="btn btn-num btn-zero" onClick={() => handleNumber(0)}>0</button>
        <button className="btn btn-num" onClick={handleDecimal}>.</button>
        <button className="btn btn-eq" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
