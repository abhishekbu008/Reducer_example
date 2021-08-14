import { useReducer } from "react";
import "./styles.css";

const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET"
};

const incrementCounter = (state, action) => ({ count: state.count + 1 });
const decrementCounter = (state, action) => ({ count: state.count - 1 });
const resetCounter = (state, action) => ({ count: action.payload.count });

// State file
const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return incrementCounter(state, action);
    case ACTIONS.DECREMENT:
      return decrementCounter(state, action);
    case ACTIONS.RESET:
      return resetCounter(state, action);
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIncrementClick = () => dispatch({ type: ACTIONS.INCREMENT });
  const onDecrementClick = () => dispatch({ type: ACTIONS.DECREMENT });
  const onResetCounter = () =>
    dispatch({ type: ACTIONS.RESET, payload: initialState });

  return (
    <>
      Count: {state.count}
      <div style={{ display: "flex", marginRight: "20px" }}>
        <button onClick={onIncrementClick}>+</button>
        <button onClick={onDecrementClick}>-</button>
        <button onClick={onResetCounter}>Reset</button>
      </div>
    </>
  );
}
