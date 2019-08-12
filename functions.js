const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0
    
    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

//é importante clonar o objeto pois  sempre que mexermos no estado de um objeto(no caso o board) 
/*  no react,nunca alteramos diretamente a referencia . Sempre vamos gerando novos objetos que são a evolução do estado*/ 
const cloneBoard =board=>{
    return board.map(rows => {
         return rows.map(field => {
            return { ...field }
        })
    })
}

//pegar os vizinhos válidos para abrir e informar as minas em volta
const getNeighbors=(board,row,column)=>{
    const neighbors = []
    const rows =[row - 1, row, row + 1] //pegandos os vizinhos(fields) baseados na linha [anterior atual próximo]
    const columns =[column - 1, column, column + 1]
    rows.forEach(r=>{
        columns.forEach(c=>{
            const different = r!== row || c!== column //valida para pegar apenas os vizinhos
            const validRow = r >= 0 || r < board.length //verifica  para não pegar uma linha que não exista [-1] ou [maior que o tamanho]
            const validColumn = c >= 0 || c < board[0].length //verifica para não pegar uma coluna que não exista [-1] ou [maior que o tamanho]
          if(different && validRow && validColumn) {
              neighbors.push(board[r][c])
          }  
            
        })
    })
    return neighbors
}
//verifica se a vizinhança do field em questão não está minada
const safesNeighbors = (board,row,column)=>{
    const safes = (result,neighbor)=> result && !neighbor.mined
    return getNeighbors(board,row,column).reduce(safes,true)
}

//abrir os fields e testando se a vizinhança é segura para continuar abrindo
const openField = (board,row,column)=>{
    const field = board[row][column]
    if(!field.opened){
        field.opened = true //abre o field se não já tiver sido aberto
        if(field.mined){
            field.exploded = true//se tiver minado seta true no exploded para informa ao player que perdeu o jogo
        }else if(safesNeighbors(board,row,column)) {//se os vizinhos estão salvos,ou seja sem minas
            //pega o vizinhos validos e abre cada celula[position][position] chamando a funcao
            //openField de forma recursiva até encontrar alguma celula/field que esteja minado
            getNeighbors(board,row,column)
            .forEach(n=>openField(board,row,column))
                
        }else{
            //se a vizinhança não está safe informa a quantidade minas que tem em volta
            const  neighbors = getNeighbors(board,row,column)
            //usando a função filter passo por pelos vizinhos e conto quantos tem minas e informo no field atual
            field.nearMines = neighbors.filter(field=>field.mined).length 
        }
    }
}
//usando o concat trago todos os registros para um unico array de forma linear para facilitar alguma funcao que eu preciso de tudo que tem dentro
//do objeto do array
const fields = board => [].concat(...board)
//filtro todo o board para saber se tem alguma mina exploded

const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0 //traz a quant/tamanho de vezez que achou um campo explodido e testa se émaior que zero 
//verifica se ainda existe algum campo no board para permite que jogador vença    
 const pendding = field => (field.mined && !field.flagged)
    || (!field.mined && !field.opened)
//verifica se o jogador venceu : transformando o board e retornado com o filtro quantos pendentes tem 
const wonGame = board => fields(board).filter(pendding).length === 0
//cso o jogador perca mostra todas as minas restantes
const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true) 
    
    
export  {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
}