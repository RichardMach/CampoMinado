import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import params from './params'

export default class App extends React.Component  {
  render(){
    return (
      <View style={styles.container}>
        {console.log(params.getColumnsAmount)}
        <Text >quantidade de linhas ! {params.getRowsAmount()}</Text>
        <Text >quantidade de Colunas ! {params.getColumnsAmount()}</Text>
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
