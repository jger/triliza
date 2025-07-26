import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import Box from './Box/Box';
import Row from './Row/Row';
import Gameover from './Gameover/Gameover';
import Newgame from './Buttons/Newgame/Newgame';


let d = 3; // Dimension of table


class App extends Component {

    // We create a default state, so we can reset the game (new game).
    defaultState = {
        box:[[]],
        round:0,
        moveCounter:0,
        game:[],
        gameOver: 0,
        win:0,
        scoreX: 0,
        scoreO: 0,
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
            this.checkIfWin(i,j);
            this.changeRound();
            this.moveCounterIncrement();
            this.checkGameOver();
            this.logMove(i,j);
        }
    };

    checkIfWin = (i,j) => {
      let box = this.state.box;
      let mark = this.state.round ? 'O' : 'X';
      let win = 0;

        if (i-1>=0 && i+1<d)
            if (box[i-1][j] === mark && box[i+1][j] === mark) win++;

        if (j-1>=0 && j+1<d)
            if (box[i][j-1] === mark && box[i][j+1] === mark) win++;

        if (i-2>=0)
            if (box[i-1][j] === mark && box[i-2][j] === mark) win++;

        if (j-2>=0)
            if (box[i][j-1] === mark && box[i][j-2] === mark) win++;

        if (i+2<d)
            if (box[i+1][j] === mark && box[i+2][j] === mark) win++;

        if (j+2<d)
            if (box[i][j+1] === mark && box[i][j+2] === mark) win++;

        if (i-2>=0 && j-2>=0)
            if (box[i-2][j-2] === mark && box[i-1][j-1] === mark) win++;

        if (i+2<d && j+2<d)
            if (box[i+2][j+2] === mark && box[i+1][j+1] === mark) win++;

        if (i-1>=0 && j-1>=0 && i+1<d && j+1<d) {
            if (box[i + 1][j - 1] === mark && box[i - 1][j + 1] === mark) win++;
            if (box[i - 1][j - 1] === mark && box[i + 1][j + 1] === mark) win++;
        }
        if (j-2>=0 && i+2<d)
            if (box[i + 1][j - 1] === mark && box[i + 2][j - 2] === mark) win++;

        if (i-2>=0 && j+2<d)
            if (box[i - 1][j + 1] === mark && box[i - 2][j + 2] === mark) win++;


        if (mark==='X') {
            let scoreX = this.state.scoreX + win;
            this.setState({scoreX:scoreX});
        }
        else
        {
            let scoreO = this.state.scoreO + win;
            this.setState({scoreO:scoreO});
        }

      // console.log(i,j,mark,win)
      // return win;
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
    decTable = () => {if (d>3) { d--;this.resetGame();}};

    resetGame = ()=> {
        this.setState({...this.defaultState });
        let box = this.state.box;
        this.initTable(box);
        this.setState({box:box});
    };

  render() {
      const containerStyle = {
          ...styles.container,
          width: d*6 + 'em'
      };

      return (
          <View style={containerStyle}>
              <View style={styles.header}>
                  <Text style={styles.title}>{d}-liza</Text>
                  <View style={styles.buttonContainer}>
                      <Text style={styles.button} onPress={() => this.decTable()}>-</Text>
                      <Text style={styles.button} onPress={() => this.incTable()}>+</Text>
                  </View>
              </View>

              { this.renderTable() }

              <View style={styles.gameInfo}>
                  <Text>Round: { this.state.round ? 'O' : 'X'}</Text>
                  <Text>Moves: { this.state.moveCounter }</Text>
                  <Text>Game notation: { this.renderGameLog() }</Text>
                  <Text>Score (X-O) : {this.state.scoreX}-{this.state.scoreO}</Text>
                  { this.state.win ? <Text>Win!</Text> : null }
                  { this.state.gameOver ? <View>
                      <Gameover scoreX={this.state.scoreX} scoreO={this.state.scoreO}/>
                      <Newgame resetGame={()=>this.resetGame()}/>
                  </View> : null }
              </View>
          </View>
      )

  }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 'auto',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        textAlign: 'center',
        padding: 8,
        margin: 4,
        fontSize: 16,
        backgroundColor: '#f0f0f0',
        minWidth: 30,
        minHeight: 30,
        borderRadius: 4,
        cursor: 'pointer',
    },
    gameInfo: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
});

export default App;
