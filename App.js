import React from 'react'
import { StyleSheet, Text, View,Alert} from 'react-native'
import params from './params'
//Componentes
import MineField from './src/MineField'
import {
  createMinedBoard
} from './functions'

export default class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount())
     
    }
  }


  render(){
    return (
      <View style={styles.container}>
       <View style={styles.board}>
          <MineField board={this.state.board}  />
        </View>

      </View>
    )

  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
})
