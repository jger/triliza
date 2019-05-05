import React, { Component } from 'react';
import './App.css';
import Box from './Box/Box';
import Row from './Row/Row';


let d = 3; // Dimension of table


class App extends Component {

    // We create a default state, so we can reset the game (new game).
    defaultState = {
        box:[[]],
        round:0,
        moveCounter:0,
        game:[],
        gameOver: 0,
    };

    constructor() {
        // In the constructor the state is not mounted so we must directly assign values
        super();
        this.state = this.defaultState;
        let box = [];
        this.initTable(box);
        this.state.box = box;
    }

    initTable = (box) => {
        for (let i=0;i<d;i++)
        {
            // Init row as array
            box[i] = [];

            for (let j=0;j<d;j++)
            {
                box[i][j] = j+d*i+1;
            }
        }
    }

    renderTable = () => {
        let table = [];

        for (let i=0;i<d;i++) {
            let row = [];
            for (let j=0;j<d;j++) {
                row.push(<Box key={'box_'+(j+d*i+1)} value={this.state.box[i][j]} clicked={()=>{this.clickHandler(i,j)}}/>);
            }
            table.push( <Row key={'row_'+i}>{row}</Row> )
        }

        return table;
    };

    clickHandler = (i,j) => {

        if (this.state.box[i][j]!=='X' && this.state.box[i][j]!=='O') {
            let box = this.state.box.slice();
            box[i][j]= this.state.round ? 'O' : 'X';
            this.setState({box:box});
            //todo checkTable
            this.changeRound();
            this.moveCounterIncrement();
            this.checkGameOver();
            this.logMove(i,j);
        }
    };

    changeRound = () => {
        let round = (this.state.round) ? 0 : 1;
        this.setState({round:round});
    };

    moveCounterIncrement = () => {
        let moveCounter = this.state.moveCounter + 1;
        this.setState({moveCounter:moveCounter});
    };

    logMove = (i,j) => {
        let boxNumber = j+d*i+1;
        let game = this.state.game.slice();
        game.push(boxNumber);
        this.setState({game:game});
    };

    renderGameLog = () => this.state.game.map(
            (game, i) => {
                let buffer = '';
                i % 2 ? buffer = 'O' + game : buffer = 'X' + game;
                buffer += (this.state.gameOver === 1 && i === this.state.game.length - 1) ? '': '→';
                return buffer
            }
        );

    checkGameOver = () => {
        let gameOver = this.state.gameOver;
        if (this.state.moveCounter === d * d - 1) gameOver = 1;
        this.setState({gameOver:gameOver});
    };

    incTable = () => {d++;this.resetGame();};
    decTable = () => {d--;this.resetGame();};

    resetGame = ()=> {
        this.setState({...this.defaultState });
        let box = this.state.box;
        this.initTable(box);
        this.setState({box:box});
    };

  render() {
      let style = {'width': d*6 + 'em'};

      return (
          <div className="App" style={style}>
              <h1>{d}-liza <button onClick={ ()=>{this.decTable();} }>-</button><button onClick={ ()=>{this.incTable();} }>+</button></h1>

              { this.renderTable() }

              <br style={ {'clear':'both'} }/>
              <hr/>
              Round: { this.state.round ? 'O' : 'X'} <br/>
              Moves: { this.state.moveCounter } <br/>
              Game notation: { this.renderGameLog() }<br/>
              { this.state.gameOver ? <div>Game Over!<br/><button onClick={()=>{  this.resetGame(); }}>New Game</button></div> : null }
          </div>
      )

  }

}

export default App;
