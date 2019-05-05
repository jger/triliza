import React, { Component } from 'react';
import './App.css';
import Box from './Box/Box';
import Row from './Row/Row';

const d = 3;
const style = {'width': d*6 + 'em'};


class App extends Component {

    state = {
        box:[[]],
        round:0,
    };

    constructor() {
        super();

        // Create state of table
        for (let i=0;i<d;i++)
        {
            // Init row as array
            this.state.box[i] = [];

            for (let j=0;j<d;j++)
            {
                this.state.box[i][j] = j+d*i+1;
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

        return  table;
    };

    clickHandler = (i,j) => {
        let box = this.state.box.slice();
        box[i][j]= this.state.round ? 'O' : 'X';
        this.setState({box:box});
        this.changeRound();
    };

    changeRound = () => {
        let round = (this.state.round) ? 0:1;
        this.setState({round:round});
    };

  render() {

      return (
          <div className="App" style={style}>
              <h1>{d}-liza</h1>

              { this.renderTable() }

              <br style={ {'clear':'both'} }/>
              <hr/>
              {/*<button className={ 'btn btn-lg' }  onClick={()=>alert("ok")}>Try me!</button>*/}
              Round: { this.state.round ? 'O' : 'X'}
          </div>
      )

  }

}

export default App;
