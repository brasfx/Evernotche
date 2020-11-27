import React from 'react';

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {decrement, increment} from "../../redux/ducks/counter";

export default function Teste() {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());

  }

  const handleDecrement = () => {
    dispatch(decrement());

  }

  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <h1>{`Count: ${count}`}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}