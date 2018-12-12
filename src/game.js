import React from 'react';
import Board from './board'
import BoardHistory from './boardHistory'
import OrderButton from './orderButton'
import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        index:0,
        squares: Array(9).fill(null),
        lastMove: null
      }],
      xIsNext: true,
      stepNumber: 0,
      order: 'asc'
    }
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];    
    const squares = current.squares.slice();
    if (gameEnded(squares) || squares[i]) { 
      return;
    }
    
    squares[i] = (this.state.xIsNext ? 'X' : 'O');
    this.setState({
      history: history.concat([{
        index: history.length,
        squares: squares,
        lastMove: i
      }]),        
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  changeOrder() {
    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc')
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const gameEnd = gameEnded(current.squares);    

    let status;
    let winnerSquare = null;
    if (gameEnd) {
      if (gameEnd.winner) {
        status = 'Winner: ' + gameEnd.winner;
        winnerSquare = gameEnd.winnerSquares;
      } else if (gameEnd.draw)  {
        status = "It's a draw - game ended!";
      }
    }    
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }   
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            winnerSquares={winnerSquare}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <span>order </span>
          <OrderButton
            onClick={() => this.changeOrder()}
          />          
          <BoardHistory
            moves={history}
            order={this.state.order}
            stepNumber={this.state.stepNumber}
            onClick={(step) => this.jumpTo(step)}
          />          
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],    
  ];

  for(let i=0; i < lines.length; ++i) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winnerSquares: lines[i]};
    }
  }
  return null;
}

function gameEnded(squares) {
  const winner = calculateWinner(squares);
  if (winner) {
    return winner;
  }
  for(let i=0; i < squares.length; ++i) {
    if (!squares[i]) {
      return null;
    }
  }
  return {draw:true};
}

export default Game;