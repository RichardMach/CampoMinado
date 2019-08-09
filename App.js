import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import params from './params'
//Componentes
import Field from './src/Field'

export default class App extends React.Component  {
  render(){
    return (
      <View style={styles.container}>
        {console.log(params.getColumnsAmount)}
        <Text >quantidade de linhas ! {params.getRowsAmount()}</Text>
        <Text >quantidade de Colunas ! {params.getColumnsAmount()}</Text>
        <Field></Field>
        <Field nearMines ={1} opened></Field>
        <Field nearMines ={3} opened ></Field>
        <Field nearMines ={2} opened></Field>
        <Field nearMines ={5} opened ></Field>
        <Field opened></Field>
      </View>
    )

  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
