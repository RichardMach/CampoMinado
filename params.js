import { Dimensions} from 'react-native'

const params ={
    blockSize  : 30,
    borderSize : 5,
    fontSize   : 15,
    headerRatio :0.15,//Proporção do painel superior da tela
    difficultLevel :0.1, //10% dos blocos gerados são ocupados por minas

    //gerando as linhas e colunas que receberão os blocos e ajustando para que que ocupem só o espaço da tela
    getColumnsAmount(){
        const width = Dimensions.get('screen').width //Captura o largura da tela
        return Math.floor(width/this.blockSize)
    },
    getRowsAmount(){
        const totalHeight  = Dimensions.get('screen').height //altura 
        const boardHeigth = totalHeight * (1-this.headerRatio)//defino a altura do tabuleiro tirando o tamanho do painel superior 
        return Math.floor(boardHeigth/this.blockSize) //arredonda para baixo a  quantidade de linhas 
    }

}

export default params