import React from 'react';
import Square from './square';
import './board.css';

class Board extends React.Component {
  renderSquare(i) {
    const winnerClass = (this.props.winnerSquares && (
            this.props.winnerSquares[0] === i || 
            this.props.winnerSquares[1] === i || 
            this.props.winnerSquares[2] === i )
            ) ? 'square-winner' : '';
    
    return (
      <Square 
        index={i+1}
        value={this.props.squares[i]}
        winner={winnerClass}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;