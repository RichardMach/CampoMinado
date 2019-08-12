import React from  'react'
import {View,Text,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag  from './Flag'


export default props =>{

    const {mined,opened,nearMines,exploded,flagged} = props


    const styleField =[styles.field]

    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded)
    if (flagged) styleField.push(styles.flagged)
    if (!opened && !exploded) styleField.push(styles.regular)


        let color =null
        if(nearMines>0){
            if(nearMines===1){
                color='#F9060a'
            }             
            else if(nearMines===2){
                color='#FFA500'
            }else if(nearMines>2 && nearMines<=4){
                color='#FFA500'
            }else if (nearMines>4 && nearMines<=6){
                color='#FFA500'
            }else {
                color='#FFA500'
            }

        }

        return (
            <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect}>
            <View style={styleField}>
                
                { !mined && opened && nearMines>0 ? <Text style={[styles.label,{ color:color }]}>{nearMines}</Text> : false }
                { mined && opened ? <Mine /> : false}
                { flagged && !opened ? <Flag /> : false}
                
            </View>
            </TouchableWithoutFeedback>
        )
}
const styles= StyleSheet.create({
    regular:{
        backgroundColor : '#999',
        borderLeftColor : '#ccc',
        borderTopColor  : '#ccc',
        borderBottomColor : '#333',
        borderRightColor : '#333'
    },
    field :{
        width: params.blockSize,
        height: params.blockSize,
        borderWidth : params.borderSize
    },
    label :{
        fontSize : params.fontSize,
        fontWeight :'bold'

        
    },
    opened :{
        backgroundColor : '#999',
        borderColor : '#777',
        alignItems: 'center',
        justifyContent :'center'

    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    }

})