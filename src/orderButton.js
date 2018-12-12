import React from 'react';
import './orderButton.css';

function OrderButton (props) {
  return (
    <label className="switch">
      <input type="checkbox"/>
      <span 
        className="slider round" 
        onClick={props.onClick}
      ></span>
    </label>
  );
}
    
//     <button 
//       className="square" 
//       onClick={props.onClick}
//     >
//       <span className="index">{props.value ? "" : props.index}</span>
//       {props.value}
//     </button>
//   );  
// }

export default OrderButton;
