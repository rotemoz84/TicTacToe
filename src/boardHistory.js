import _ from 'lodash';
import React from 'react';
import './boardHistory.css';

class BoardHistory extends React.Component {
  render() {
    const arr = [{id:2, name:'b'}, {id:1, name:'a'}, {id:3, name:'c'}]
    const or = _.orderBy(arr, 'id', 'desc');
    
    
    const ordered = _.orderBy(this.props.moves, 'index', this.props.order);
    const moves = ordered.map((step) => {
      const desc = step.index ?
        'Go to move #' + step.index  + ' (' + (step.lastMove+1) + ')':
        'Go to game start';
      return (
        <li key={step.index}>
          <button className={(step.index===this.props.stepNumber ? 'historyButtonClicked' : 'historyButton')}
            onClick={() => this.props.onClick(step.index)}   
          >
            {desc}
          </button>
        </li>
      );
    });
    return (
      <ol>{moves}</ol>
    )
  }
}

export default BoardHistory;