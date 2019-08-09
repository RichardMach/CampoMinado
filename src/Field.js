import React from  'react'
import {View,Text,StyleSheet} from 'react-native'
import params from '../params'


export default props =>{

    const {mined,opened,nearMines,estoured} = props


    const styleField =[styles.field]

        if(opened) styleField.push(styles.opened)
        if(styleField.length===1) styleField.push(styles.regular)
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
            <View style={styleField}>
                { !mined && opened && nearMines>0 ?
                <Text style={[styles.label,{ color:color }]}>{nearMines}</Text>
                : false
                }
            </View>
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

    }

})