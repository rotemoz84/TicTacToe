import React from 'react';
import './square.css';

function Square (props) {
  return (
    <button 
      className={"square " + props.winner} 
      onClick={props.onClick}
    >
      <span className="index">{props.value ? "" : props.index}</span>
      {props.value}
    </button>
  );  
}

export default Square;