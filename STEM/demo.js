canvas = document.getElementById('canvas1')
meter = document.getElementById('mom_meter')
canvas.width = 400
canvas.height = 400
meter.width = 400
meter.height = 20

c = canvas.getContext('2d') 
meter_context = meter.getContext('2d')

c.fillStyle='blue'
c.fillRect(0,0,canvas.width,canvas.height)

c.fillStyle='black'
c.font = 'bold 30px Arial'
c.fillText('Shadow Fighter',90,90)
c.font = 'bold 15px Arial'
c.fillText('-Your job is to fight back the shadows',60,140)
c.fillText('that seek to take over the world.',80,170)
c.fillText('-Use WASD to move your player.',80,210)
c.fillText('-You have a shadow meter which will fill up the',30,250)
c.fillText('more the world becomes ungulfed in darkness.',40,280)
c.fillText('-Let the meter fill and the shadows will win.',50,320)

meter_context.fillStyle='grey'
meter_context.fillRect(0,0,meter.width,meter.height)

class Player{
    constructor({position}){
        this.position = position
    }
}
class Cell{
    constructor(row,col,state){
        this.row = row
        this.col = col
        this.state = state
        this.livingNeighbours = null
        this.color = 'blue'
    }
    setColor(color){
        this.color=color
    }
}
class Grid{
    constructor(numRows, numCols){
        this.numRows = numRows
        this.numCols = numCols
        this.cellList = []
        var initSpinner1PosX = Math.floor(Math.random()*17+1)
        var initSpinner1PosY = Math.floor(Math.random()*17+1)
        var initSpinner2PosX = Math.floor(Math.random()+5)
        var initSpinner2PosY = Math.floor(Math.random()+5)
        for(var i=0;i<this.numRows;i++){
            for(var j=0;j<this.numCols;j++){      

                if(i==initSpinner1PosX && j==initSpinner1PosY){
                    console.log(initSpinner1PosX)
                    this.cellList.push(new Cell(initSpinner1PosX,initSpinner1PosY,1))
                }
                else if(i==initSpinner1PosX+1 && j==initSpinner1PosY){
                    this.cellList.push(new Cell(initSpinner1PosX+1,initSpinner1PosY,1))
                }
                else if(i==initSpinner1PosX+2 && j==initSpinner1PosY){
                    this.cellList.push(new Cell(initSpinner1PosX+2,initSpinner1PosY,1))
                }
                else if(i==initSpinner2PosX && j==initSpinner2PosY){
                    this.cellList.push(new Cell(initSpinner2PosX,initSpinner2PosY,1))
                }
                else if(i==initSpinner2PosX+1 && j==initSpinner2PosY){
                    this.cellList.push(new Cell(initSpinner2PosX+1,initSpinner2PosY,1))
                }
                else if(i==initSpinner2PosX+2 && j==initSpinner2PosY){
                    this.cellList.push(new Cell(initSpinner2PosX+2,initSpinner2PosY,1))
                }
                else{
                    this.cellList.push(new Cell(i,j,0))
                }
                
            }
        }
    }
    getColor(row,col){
        for (var i=0;i<this.cellList.length;i++){
            if(this.cellList[i].row == row && this.cellList[i].col == col){
                return this.cellList[i].color
            }
        }  
    }
    setColor(row,col,color){
        for (var i=0;i<this.cellList.length;i++){
            if(this.cellList[i].row == row && this.cellList[i].col == col){
                this.cellList[i].color = color
            }
        }
    }
    setState(row,col,state){
        for (var i=0;i<this.cellList.length;i++){
            if(this.cellList[i].row == row && this.cellList[i].col == col){
                this.cellList[i].state = state
            }
        }

    }
    getState(row,col){
        for (var i=0;i<this.cellList.length;i++){
            if(this.cellList[i].row == row && this.cellList[i].col == col){
                return this.cellList[i].state
            }
        }
    }
    draw(){
        c.fillStyle = 'blue'
        for(var i=0;i<this.numRows;i++){
            for(var j=0;j<this.numRows;j++){
                if(this.getState(i,j)==1){
                    if(this.getColor(i,j)=='red'){
                        c.fillStyle = 'red'
                    }
                    else{
                        c.fillStyle = 'black'
                    }
                }
                c.fillRect(j*20,i*20,20,20)
                c.fillStyle = 'blue'

            }
        }
    }
    updateLivingNeighbours(){
        var neighbourCount
        for (var cell of this.cellList){
            neighbourCount = 0
            if(cell.row == 0 && cell.col == 0){ //case: top left corner
                neighbourCount = this.getState(1,0)+this.getState(1,1)+this.getState(0,1)
            }
            else if(cell.row == 0 && cell.col > 0 && cell.col == this.numCols-1){ // case: top right corner
                neighbourCount = this.getState(cell.row,cell.col-1)+
                    this.getState(cell.row+1,cell.col-1)+
                    this.getState(cell.row+1,cell.col)
            }
            else if(cell.row == this.numRows-1 && cell.col ==0){ // case: bottom left corner
                neighbourCount = this.getState(cell.row-1,cell.col)+
                    this.getState(cell.row-1,cell.col+1)+
                    this.getState(cell.row,cell.col+1)
            }
            else if(cell.row == this.numRows-1 && cell.col == this.numCols-1){ // case: bottom right corner
                neighbourCount = this.getState(cell.row-1,cell.col)+
                    this.getState(cell.row-1,cell.col-1)+
                    this.getState(cell.row,cell.col-1)
            }
            else if(cell.row == 0 && cell.col > 0 && cell.col < this.numCols-1){ //case: top middle row
                neighbourCount = this.getState(cell.row,cell.col-1)+
                    this.getState(cell.row,cell.col+1)+
                    this.getState(cell.row+1,cell.col-1)+
                    this.getState(cell.row+1,cell.col)+
                    this.getState(cell.row+1,cell.col+1)
            }
            else if(cell.row > 0 && cell.row < this.numRows-1 && cell.col == 0){ // case: left middle col
                neighbourCount = this.getState(cell.row-1,cell.col)+
                    this.getState(cell.row-1,cell.col+1)+
                    this.getState(cell.row,cell.col+1)+
                    this.getState(cell.row+1,cell.col+1)+
                    this.getState(cell.row+1,cell.col)
            }
            else if(cell.row > 0 && cell.row < this.numRows-1 && cell.col == this.numCols-1){ // case: right middle col
                neighbourCount = this.getState(cell.row-1,cell.col)+
                    this.getState(cell.row-1,cell.col-1)+
                    this.getState(cell.row,cell.col-1)+
                    this.getState(cell.row+1,cell.col-1)+
                    this.getState(cell.row+1,cell.col)
            }
            else if(cell.row == this.numRows-1 && cell.col > 0 && cell.col < this.numCols-1){ // case: bottom middle row
                neighbourCount = this.getState(cell.row-1,cell.col-1)+
                    this.getState(cell.row-1,cell.col)+
                    this.getState(cell.row-1,cell.col+1)+
                    this.getState(cell.row,cell.col-1)+
                    this.getState(cell.row,cell.col+1)
            }
            else{
                neighbourCount = this.getState(cell.row-1,cell.col-1)+
                    this.getState(cell.row-1,cell.col)+
                    this.getState(cell.row-1,cell.col+1)+
                    this.getState(cell.row,cell.col-1)+
                    this.getState(cell.row,cell.col+1)+
                    this.getState(cell.row+1,cell.col-1)+
                    this.getState(cell.row+1,cell.col)+
                    this.getState(cell.row+1,cell.col+1)
           }
            cell.livingNeighbours = neighbourCount

        }
    }
    updateCells(){
        for (var cell of this.cellList){
            if (cell.state == 1 && cell.livingNeighbours < 2){cell.state = 0}
            else if (cell.state == 1 && cell.livingNeighbours > 3){cell.state = 0}
            else if (cell.state == 0 && cell.livingNeighbours == 3){cell.state = 1}
        }
    }
}

player = new Player({
    position:{
        i:10,
        j:10
    }
})
grid = new Grid(20,20)
gameOver = false
let score=0
let chaosLevel = 0

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

// initialize the timer variables and start the animation


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}
function animate(){
    window.requestAnimationFrame(animate)

    now = Date.now();
    elapsed = now - then;

    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        c.clearRect(0,0,canvas.width,canvas.height)

        grid.updateLivingNeighbours()
        grid.updateCells()
        
        var activeCellCount = 0
        for(cell of grid.cellList){
            if(cell.state == 1){
                if(gameOver == false){
                    cell.setColor('black')
                }
                activeCellCount++
            }
        }
        if(gameOver == false){
            chaosLevel = 400*activeCellCount/50
        }
        
        meter_context.fillStyle = 'grey'
        meter_context.fillRect(0,0,meter.width,meter.height)
        meter_context.fillStyle = 'black'
        meter_context.fillRect(0,0,chaosLevel,meter.height)

        if(chaosLevel >= 400){
            gameOver = true
        }


        grid.setState(player.position.i,player.position.j,1)
        grid.setColor(player.position.i,player.position.j,'red')
        if(Math.random()<0.08 && gameOver==false){
            spinnerPosX = Math.floor(Math.random()*17+1)
            spinnerPosY = Math.floor(Math.random()*17+1)

            grid.setState(spinnerPosX,spinnerPosY,1)
            grid.setState(spinnerPosX+1,spinnerPosY,1)
            grid.setState(spinnerPosX+2,spinnerPosY,1)
        }


        if(gameOver == true){
            chaosLevel = 400
            c.fillStyle = 'black'
            c.fillRect(0,0,canvas.width,canvas.height)

            c.fillStyle = 'white'
            c.font = "bold 20px Arial"
            c.fillText('The shadows overtake you,', 70, 170);
            c.fillText('suffocating you in darkness', 68, 200);
            c.fillText('Click anywhere to play again', 70, 260);
        }
        else{
            grid.draw()
        }
        c.fillStyle = 'white'
        c.font = "bold 20px Arial"
        c.fillText('Score: '+score.toString(), 10, 25);
    }
    
    
}

window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'w':
            if(player.position.i > 0){
                grid.setState(player.position.i,player.position.j,0)
                player.position.i--
            }
            break
        case 'a':
            if(player.position.j > 0){
                grid.setState(player.position.i,player.position.j,0)
                player.position.j--
            }
            break
        case 's':
            if(player.position.i < grid.numRows-1){
                grid.setState(player.position.i,player.position.j,0)
                player.position.i++
            }
            break
        case 'd':
            if(player.position.j < grid.numCols-1){
                grid.setState(player.position.i,player.position.j,0)
                player.position.j++
            }
            break
    }
})

canvas.addEventListener('mousedown',()=>{
    startAnimating(10)
    setInterval(()=>{
        if(gameOver == false){
            score += 10
        }
        
    },1000)
    if(gameOver == true){
        player = new Player({
            position:{
                i:10,
                j:10
            }
        })
        grid = new Grid(20,20)
        gameOver = false
        score=0
    }
})

