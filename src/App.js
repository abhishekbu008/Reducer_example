import { useReducer } from "react";
import axios from "axios";
import "./styles.css";

const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  FETCHDATA: "FETCH_DATA"
};

// custom reducer hook with async dispatch
const useReducerWithThunk = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const customDispatch = (action) => {
    if (typeof action === "function") {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, customDispatch];
};

// State file
const incrementCounter = (state, action) => ({
  ...state,
  count: state.count + 1
});
const decrementCounter = (state, action) => ({
  ...state,
  count: state.count - 1
});
const resetCounter = (state, action) => ({
  data: {},
  count: action.payload.count
});

const updateData = (state, action) => ({ ...state, data: action.payload });

const initialState = {
  count: 0,
  data: {}
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return incrementCounter(state, action);
    case ACTIONS.DECREMENT:
      return decrementCounter(state, action);
    case ACTIONS.RESET:
      return resetCounter(state, action);
    case ACTIONS.FETCHDATA:
      return updateData(state, action);
    default:
      return state;
  }
}

const axiosInstance = axios.create();

const fetchData = () => async (dispatch) => {
  const post = await axiosInstance.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  console.log(post);
  dispatch({ type: ACTIONS.FETCHDATA, payload: post.data });
};

export default function App() {
  const [state, dispatch] = useReducerWithThunk(reducer, initialState);

  const onIncrementClick = () => dispatch({ type: ACTIONS.INCREMENT });
  const onDecrementClick = () => dispatch({ type: ACTIONS.DECREMENT });
  const onResetCounter = () =>
    dispatch({ type: ACTIONS.RESET, payload: initialState });

  const getData = () => {
    dispatch(fetchData());
  };

  return (
    <>
      Count: {state.count}
      <div style={{ display: "flex" }}>
        <button style={{ marginRight: "10px" }} onClick={onIncrementClick}>
          +
        </button>
        <button style={{ marginRight: "10px" }} onClick={onDecrementClick}>
          -
        </button>
        <button style={{ marginRight: "10px" }} onClick={onResetCounter}>
          Reset
        </button>
        <button style={{ marginRight: "10px" }} onClick={getData}>
          Get Data
        </button>
      </div>
      <div>Data: {JSON.stringify(state.data)}</div>
    </>
  );
}
