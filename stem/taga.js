canvas = document.getElementById('canvas')
canvas.width = 400
canvas.height = 400
c = canvas.getContext('2d')


class Cell{
    constructor(type){
        this.type = type
        this.occupied = 'None'
    }
}
class Player{
    constructor({position,orientation}){
        this.position = position
        this.orientation = orientation
    }
}

gameData = {
    day:1,
    time:8,
    hunger:0,
    hull:100,
    fish:0,
    money:0,
    forecast:0.1,
    fish_caught:0,
    plane_parts:0,
    storm:false,
    game_over:false,
    game_win:false,

}
menuList = {
    fishing:'closed',
    shop:'closed',
    mechanic:'closed',
    home:'closed',
    help:'open',
}
player = new Player({
    position:{
        x:6,
        y:3
    },
    orientation:'vertical'
})

grid = [[new Cell('land'),new Cell('land'),new Cell('land'),new Cell('land'),new Cell('shallow_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water')],
        [new Cell('land'),new Cell('land'),new Cell('land'),new Cell('land'),new Cell('shallow_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water')],
        [new Cell('land'),new Cell('land'),new Cell('land'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water')],
        [new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water')],
        [new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water'),new Cell('deep_water')],
        [new Cell('deep_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('deep_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water')],
        [new Cell('deep_water'),new Cell('shallow_water'),new Cell('land'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('land'),new Cell('land')],
        [new Cell('deep_water'),new Cell('shallow_water'),new Cell('land'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('land'),new Cell('land'),new Cell('land')],
        [new Cell('deep_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('shallow_water'),new Cell('land'),new Cell('land'),new Cell('land')]]
cell_size = canvas.width/grid.length
grid[player.position.x][player.position.y].occupied = 'player'
grid[player.position.x][player.position.y].occupied = 'boat'
grid[2][0].occupied = 'mechanic'
grid[0][2].occupied = 'witch'
grid[2][2].occupied = 'shop'
grid[7][5].occupied = 'home'
grid[6][2].occupied = 'help'
grid[1][0].occupied = 'trees1'
grid[1][2].occupied = 'trees2'
grid[1][3].occupied = 'trees3'
grid[0][3].occupied = 'trees4'
grid[0][0].occupied = 'trees5'
grid[6][7].occupied = 'plane'


animate()
function animate(frame){
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    for(row_index in grid){
        row = grid[row_index]
        for(cell_index in row){
            cell = row[cell_index]
            switch(cell.type){
                case 'shallow_water':
                    c.fillStyle = '#1a53ff'
                    break
                case 'deep_water':
                    c.fillStyle = '#0039e6'
                    break
                case 'land':
                    c.fillStyle = 'green'
            }
            c.fillRect(row_index*cell_size,cell_index*cell_size,cell_size,cell_size)
            switch(cell.occupied){
                case 'shop':
                    c.fillStyle = '#796653'
                    c.fillRect(row_index*cell_size+0.36*cell_size,
                        cell_index*cell_size-1.3*cell_size,
                        0.2*cell_size,
                        1.5*cell_size)
                    c.fillRect(row_index*cell_size-2.0*cell_size,
                        cell_index*cell_size-0.6*cell_size,
                        2.7*cell_size,
                        0.2*cell_size)
                    c.fillStyle = '#663300'
                    c.fillRect(row_index*cell_size+0.15*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.6*cell_size,
                        0.4*cell_size)
                    break
                case 'home':
                    c.fillStyle = '#663300'
                    c.fillRect(row_index*cell_size+0.3*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        cell_size-0.5*cell_size,
                        cell_size-0.6*cell_size)
                    c.fillRect(row_index*cell_size-cell_size*0.3,
                        cell_index*cell_size+cell_size*0.7,
                        cell_size*0.3,
                        cell_size*0.2)
                    break
                case 'plane':
                    if(gameData.plane_parts==5){
                        c.fillStyle = '#595959'
                        c.fillRect(row_index*cell_size+0.22*cell_size,
                            cell_index*cell_size+0.3*cell_size,
                            0.05*cell_size,
                            0.2*cell_size)
                        c.fillRect(row_index*cell_size+0.3*cell_size,
                            cell_index*cell_size+0.33*cell_size,
                            0.8*cell_size,
                            0.15*cell_size)
                        c.fillRect(row_index*cell_size+0.2*cell_size,
                            cell_index*cell_size+0.37*cell_size,
                            0.6*cell_size,
                            0.05*cell_size)
                        c.fillRect(row_index*cell_size+0.4*cell_size,
                            cell_index*cell_size+0.1*cell_size,
                            0.15*cell_size,
                            0.6*cell_size)
                        c.fillRect(row_index*cell_size+0.8*cell_size,
                            cell_index*cell_size+0.25*cell_size,
                            0.1*cell_size,
                            0.32*cell_size)
                    }

                    break
                case 'trees1':
                    c.fillStyle = '#734d26'
                    c.fillRect(row_index*cell_size+0.5*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.2*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillStyle = '#004d00'
                    c.fillRect(row_index*cell_size+0.4*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.1*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.45*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.51*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.21*cell_size,
                        cell_index*cell_size+0.1*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    break
                case 'trees2':
                    c.fillStyle = '#734d26'
                    c.fillRect(row_index*cell_size+0.4*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.7*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillStyle = '#004d00'
                    c.fillRect(row_index*cell_size+0.3*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.6*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.35*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.65*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.41*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.71*cell_size,
                        cell_index*cell_size+0.1*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)

                    c.fillRect(row_index*cell_size+0.15*cell_size,
                        cell_index*cell_size+0.22*cell_size,
                        0.17*cell_size,
                        0.17*cell_size)
                    c.fillRect(row_index*cell_size+0.12*cell_size,
                        cell_index*cell_size+0.22*cell_size,
                        0.23*cell_size,
                        0.13*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size,
                        cell_index*cell_size+0.17*cell_size,
                        0.16*cell_size,
                        0.1*cell_size)
                    c.fillStyle ='#992600'
                    c.fillRect(row_index*cell_size+0.17*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.26*cell_size,
                        cell_index*cell_size+0.23*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size,
                        cell_index*cell_size+0.27*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.24*cell_size,
                        cell_index*cell_size+0.29*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    break
                case 'trees3':
                    c.fillStyle = '#734d26'
                    c.fillRect(row_index*cell_size+0.7*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.2*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillStyle = '#004d00'
                    c.fillRect(row_index*cell_size+0.6*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.1*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.65*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.71*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.21*cell_size,
                        cell_index*cell_size+0.1*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    break
                case 'trees4':
                    tree_offset_x=-0.2
                    tree_offset_y=-0.4
                    c.fillStyle = '#734d26'
                    c.fillRect(row_index*cell_size+0.4*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.5*cell_size+tree_offset_y*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.7*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.3*cell_size,
                        cell_index*cell_size+0.6*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillStyle = '#004d00'
                    c.fillRect(row_index*cell_size+0.3*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.5*cell_size+tree_offset_y*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.6*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.2*cell_size,
                        cell_index*cell_size+0.6*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)

                    c.fillRect(row_index*cell_size+0.35*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.4*cell_size+tree_offset_y*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.65*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.25*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)

                    c.fillRect(row_index*cell_size+0.41*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.3*cell_size+tree_offset_y*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.71*cell_size,
                        cell_index*cell_size+0.1*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.31*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    
                    bush_offset_x=0.3
                    bush_offset_y=-0.3
                    c.fillRect(row_index*cell_size+0.15*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.22*cell_size+bush_offset_y*cell_size,
                        0.17*cell_size,
                        0.17*cell_size)
                    c.fillRect(row_index*cell_size+0.12*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.22*cell_size+bush_offset_y*cell_size,
                        0.23*cell_size,
                        0.13*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.17*cell_size+bush_offset_y*cell_size,
                        0.16*cell_size,
                        0.1*cell_size)
                    c.fillStyle ='#992600'
                    c.fillRect(row_index*cell_size+0.17*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.2*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.26*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.23*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.27*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.24*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.29*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    break
                case 'trees5':
                    tree_offset_x=-0.2
                    tree_offset_y=-0.4
                    c.fillStyle = '#734d26'
                    c.fillRect(row_index*cell_size+0.4*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.5*cell_size+tree_offset_y*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.7*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillRect(row_index*cell_size+0.3*cell_size,
                        cell_index*cell_size+0.6*cell_size,
                        0.1*cell_size,
                        0.3*cell_size)
                    c.fillStyle = '#004d00'
                    c.fillRect(row_index*cell_size+0.3*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.5*cell_size+tree_offset_y*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.6*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.2*cell_size,
                        cell_index*cell_size+0.6*cell_size,
                        0.3*cell_size,
                        0.2*cell_size)

                    c.fillRect(row_index*cell_size+0.35*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.4*cell_size+tree_offset_y*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.65*cell_size,
                        cell_index*cell_size+0.2*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.25*cell_size,
                        cell_index*cell_size+0.5*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)

                    c.fillRect(row_index*cell_size+0.41*cell_size+tree_offset_x*cell_size,
                        cell_index*cell_size+0.3*cell_size+tree_offset_y*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.71*cell_size,
                        cell_index*cell_size+0.1*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    c.fillRect(row_index*cell_size+0.31*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.08*cell_size,
                        0.2*cell_size)
                    
                    bush_offset_x=0.3
                    bush_offset_y=-0.3
                    c.fillRect(row_index*cell_size+0.15*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.22*cell_size+bush_offset_y*cell_size,
                        0.17*cell_size,
                        0.17*cell_size)
                    c.fillRect(row_index*cell_size+0.12*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.22*cell_size+bush_offset_y*cell_size,
                        0.23*cell_size,
                        0.13*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.17*cell_size+bush_offset_y*cell_size,
                        0.16*cell_size,
                        0.1*cell_size)
                    c.fillStyle ='#992600'
                    c.fillRect(row_index*cell_size+0.17*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.2*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.26*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.23*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.15*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.27*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    c.fillRect(row_index*cell_size+0.24*cell_size+bush_offset_x*cell_size,
                        cell_index*cell_size+0.29*cell_size+bush_offset_y*cell_size,
                        0.04*cell_size,
                        0.04*cell_size)
                    break
                case 'mechanic':
                    c.fillStyle = '#663300'
                    c.fillRect(row_index*cell_size+0.2*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        cell_size-0.5*cell_size,
                        cell_size-0.6*cell_size)
                    break
                case 'witch':
                    c.fillStyle = '#796653'
                    c.fillRect(row_index*cell_size+0.32*cell_size,
                        cell_index*cell_size-0.4*cell_size,
                        0.2*cell_size,
                        1*cell_size)
                    c.fillStyle = '#663300'
                    c.fillRect(row_index*cell_size+0.2*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        0.45*cell_size,
                        0.4*cell_size)
                    c.fillStyle = '#595959'
                    c.fillRect(row_index*cell_size+0.75*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.2*cell_size,
                        0.2*cell_size)
                    
                    break
                case 'player':
                    c.fillStyle = '#996633'
                    if(player.orientation == 'horizontal'){
                        c.fillRect(row_index*cell_size+0.3*cell_size,
                            cell_index*cell_size+0.3*cell_size,
                            cell_size-0.6*cell_size,
                            cell_size-0.6*cell_size)
                        c.fillRect(row_index*cell_size+0.2*cell_size,
                            cell_index*cell_size+0.4*cell_size,
                            cell_size-0.4*cell_size,
                            cell_size-0.8*cell_size)
                    }
                    else{
                        c.fillRect(row_index*cell_size+0.3*cell_size,
                            cell_index*cell_size+0.3*cell_size,
                            cell_size-0.6*cell_size,
                            cell_size-0.6*cell_size)
                        c.fillRect(row_index*cell_size+0.4*cell_size,
                            cell_index*cell_size+0.2*cell_size,
                            cell_size-0.8*cell_size,
                            cell_size-0.4*cell_size)
                    }
                    break
                case 'help':
                    c.fillStyle = '#663300'
                    c.fillRect(row_index*cell_size+0.45*cell_size,
                        cell_index*cell_size+0.25*cell_size,
                        cell_size-0.9*cell_size,
                        cell_size-0.45*cell_size)
                    c.fillStyle = '#996633'
                    c.fillRect(row_index*cell_size+0.3*cell_size,
                        cell_index*cell_size+0.3*cell_size,
                        cell_size-0.6*cell_size,
                        cell_size-0.7*cell_size)
                    c.fillStyle = 'black'
                    c.fillRect(row_index*cell_size+0.35*cell_size,
                        cell_index*cell_size+0.35*cell_size,
                        0.15*cell_size,
                        0.01*cell_size)
                    c.fillRect(row_index*cell_size+0.53*cell_size,
                        cell_index*cell_size+0.35*cell_size,
                        0.1*cell_size,
                        0.01*cell_size)

                    c.fillRect(row_index*cell_size+0.35*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.1*cell_size,
                        0.01*cell_size)
                    c.fillRect(row_index*cell_size+0.48*cell_size,
                        cell_index*cell_size+0.4*cell_size,
                        0.15*cell_size,
                        0.01*cell_size)

                    c.fillRect(row_index*cell_size+0.35*cell_size,
                        cell_index*cell_size+0.46*cell_size,
                        0.3*cell_size,
                        0.01*cell_size)
                    c.fillRect(row_index*cell_size+0.35*cell_size,
                        cell_index*cell_size+0.52*cell_size,
                        0.3*cell_size,
                        0.01*cell_size)
                    
                    break
            }
        }
    }
    c.fillStyle = 'grey'
    c.fillRect(0,grid[0].length*cell_size,canvas.width,cell_size)
    c.fillStyle = 'black'
    c.font = "13px Georgia";
    c.fillText("Day: "+gameData.day.toString(), cell_size*0.3, grid[0].length*cell_size+cell_size*0.4);
    c.fillText("Time: "+gameData.time.toString()+":00", cell_size*0.3, grid[0].length*cell_size+cell_size*0.75);
    c.fillText("Hunger: "+gameData.hunger.toString()+"%", cell_size*2.4, grid[0].length*cell_size+cell_size*0.75);
    c.fillText("Hull: "+gameData.hull.toString()+"%", cell_size*2.4, grid[0].length*cell_size+cell_size*0.4);
    c.fillText("Fish: "+gameData.fish.toString()+"/50", cell_size*4.5, grid[0].length*cell_size+cell_size*0.75);
    c.fillText("Money: "+gameData.money.toString()+"$", cell_size*4.5, grid[0].length*cell_size+cell_size*0.4);
    c.fillText("Plane parts: "+gameData.plane_parts.toString()+'/5', cell_size*6.5, grid[0].length*cell_size+cell_size*0.4);
    c.fillText("Forecast: "+Math.floor(100*gameData.forecast).toString()+'%', cell_size*6.5, grid[0].length*cell_size+cell_size*0.75);
    if(menuList.fishing == 'open'){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = '15px Georgia'
        c.fillText('Fishing Report',2*cell_size,2*cell_size)
        c.fillText(' - Fish caught: '+gameData.fish_caught.toString(),2*cell_size,2.5*cell_size)
        if(gameData.storm){
            c.fillText(' - Storm: yes',2*cell_size,3*cell_size)
        }
        else{
            c.fillText(' - Storm: no',2*cell_size,3*cell_size)
        }
        c.fillText("Press 'f' to close",2.1*cell_size,4*cell_size)
    }
    else if(menuList.shop == 'open'){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = "15px Georgia";
        c.fillText("Shop",1.8*cell_size,1.8*cell_size)
        c.font = "12px Georgia";
        c.fillText("Key",1.7*cell_size,2.3*cell_size)
        c.fillText("j",1.7*cell_size,2.8*cell_size)
        c.fillText("k",1.7*cell_size,3.3*cell_size)

        c.fillText("Function",2.4*cell_size,2.3*cell_size)
        c.fillText("Sell fish",2.4*cell_size,2.8*cell_size)
        c.fillText("Buy fish",2.4*cell_size,3.3*cell_size)

        c.fillText("Details",3.7*cell_size,2.3*cell_size)
        c.fillText("-1 fish, +5 money",3.7*cell_size,2.8*cell_size)
        c.fillText("+1 fish, -5 money",3.7*cell_size,3.3*cell_size)
    }
    else if(menuList.home == 'open'){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = "15px Georgia";
        c.fillText("Home",1.8*cell_size,1.8*cell_size)
        c.font = "12px Georgia";
        c.fillText("Key",1.7*cell_size,2.3*cell_size)
        c.fillText("z",1.7*cell_size,2.8*cell_size)
        c.fillText("x",1.7*cell_size,3.6*cell_size)
        c.fillText("g",1.7*cell_size,4.1*cell_size)

        c.fillText("Function",2.4*cell_size,2.3*cell_size)
        c.fillText("Sleep",2.4*cell_size,2.8*cell_size)
        c.fillText("Eat fish",2.4*cell_size,3.6*cell_size)
        c.fillText("Play guitar",2.4*cell_size,4.1*cell_size)

        c.fillText("Details",4.2*cell_size,2.3*cell_size)
        c.fillText("+1 time, +5 hunger ",4.2*cell_size,2.8*cell_size)
        c.fillText("safe from storm",4.2*cell_size,3.1*cell_size)
        c.fillText("-1 fish, -5 hunger",4.2*cell_size,3.6*cell_size)
        c.fillText("Ooh pretty",4.2*cell_size,4.1*cell_size)
    }
    else if(menuList.mechanic == 'open'){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = "15px Georgia"
        c.fillText("Mechanic",1.8*cell_size,1.8*cell_size)
        c.font = "12px Georgia"
        c.fillText("Key",1.7*cell_size,2.5*cell_size)
        c.fillText("n",1.7*cell_size,3*cell_size)
        c.fillText("p",1.7*cell_size,3.5*cell_size)

        c.fillText("Function",2.4*cell_size,2.5*cell_size)
        c.fillText("Repair hull",2.4*cell_size,3*cell_size)
        c.fillText("Buy plane part",2.4*cell_size,3.5*cell_size)

        c.fillText("Details",4.5*cell_size,2.5*cell_size)
        c.fillText("+10 hull, -20 money",4.5*cell_size,3*cell_size)
        c.fillText("+1 plane part, -50 money",4.5*cell_size,3.5*cell_size)
    }
    else if(menuList.help == 'open'){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = "15px Georgia"
        c.fillText("Welcome to Taga!",1.8*cell_size,1.95*cell_size)
        c.font = "12px Georgia"
        c.fillText(" - Use the 'wasd' keys to move your boat",1.8*cell_size,2.5*cell_size)
        c.fillText(" - You can interact with things if you're",1.8*cell_size,3*cell_size)
        c.fillText("    next to them by pressing 'i'.",1.8*cell_size,3.4*cell_size)
        c.fillText(" - You can close menus with 'i' as well",1.8*cell_size,3.9*cell_size)
        c.fillText(" - When not in a menu, you can go fish ",1.8*cell_size,4.4*cell_size)
        c.fillText("    for an hour by pressing the 'f' key",1.8*cell_size,4.8*cell_size)
        c.fillText(" - Use the 'r' key to reset the game",1.8*cell_size,5.3*cell_size)
    }
    else if(gameData.game_over){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = "15px Georgia"
        
        if(gameData.game_over){
            c.fillText("Looks like that's game over!",2*cell_size,2*cell_size)
            c.fillText("Press 'r' to reset.",2*cell_size,2.5*cell_size)
        }
    }
    else if(gameData.game_win){
        c.fillStyle = 'grey'
        c.fillRect(cell_size,cell_size,(grid.length-2)*cell_size,(grid[0].length-2)*cell_size)
        c.fillStyle = 'black'
        c.font = "15px Georgia"
        
        c.fillText("You take off in your plane. ",2*cell_size,2*cell_size)
        c.fillText("You win! Good job!!",2*cell_size,2.5*cell_size)
    }
    requestAnimationFrame(animate)
}

window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'w':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                && !gameData.game_over
                && !gameData.game_win){
                if(player.position.y > 0){
                    if(grid[player.position.x][player.position.y-1].type != 'land'){
                        grid[player.position.x][player.position.y].occupied = 'None'
                        player.position.y -= 1
                    }
                }
                player.orientation = 'vertical'
            }
            break
        case 'a':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                && !gameData.game_over
                && !gameData.game_win){
                if(player.position.x > 0){
                    if(grid[player.position.x-1][player.position.y].type != 'land'){
                        grid[player.position.x][player.position.y].occupied = 'None'
                        player.position.x -= 1
                        
                    }
                }
                player.orientation = 'horizontal'
            }
            break
        case 's':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                && !gameData.game_over
                && !gameData.game_win){
                if(player.position.y < grid[0].length-1){
                    if(grid[player.position.x][player.position.y+1].type != 'land'){
                        grid[player.position.x][player.position.y].occupied = 'None'
                        player.position.y += 1
                    }
                }
                player.orientation = 'vertical'
            }
            break
        case 'd':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                && !gameData.game_over
                && !gameData.game_win){
                if(player.position.x < grid.length-1){
                    if(grid[player.position.x+1][player.position.y].type != 'land'){
                        grid[player.position.x][player.position.y].occupied = 'None'
                        player.position.x += 1
                        
                    }
                }
                player.orientation = 'horizontal'
            }
            break
        case 'f':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                && !gameData.game_over
                && !gameData.game_win){
                menuList.fishing = 'open'
                if(gameData.time == 23){
                    gameData.time = 0
                    gameData.day += 1
                }
                else{gameData.time += 1}
                if(gameData.hunger + 5 >= 100){
                    gameData.hunger = 100
                    gameData.game_over = true
                    menuList.fishing='closed'
                }
                else{
                    gameData.hunger += 5
                }
                if(grid[player.position.x][player.position.y].type == 'deep_water'){
                    fish_caught = Math.floor(7*Math.random())
                }
                else{
                    fish_caught = Math.floor(5*Math.random())
                }
                gameData.fish_caught = fish_caught
                if(gameData.fish+fish_caught <= 50){
                    gameData.fish += fish_caught
                }
                else if(gameData.fish+fish_caught>50){
                    gameData.fish = 50
                }
                if(Math.random() < gameData.forecast){
                    gameData.storm=true
                    gameData.forecast=0.1 
                    if(grid[player.position.x][player.position.y].type == 'deep_water'){
                        stormDamage=50
                    }
                    else{
                        stormDamage=30
                    }
                    
                    if(gameData.hull-stormDamage <= 0){
                        gameData.hull = 0
                        gameData.game_over = true
                        menuList.fishing = 'closed'
                    }
                    else{
                        gameData.hull -= stormDamage
                    }
                }
                else{
                    gameData.storm=false
                    forecastChange = Math.random()*0.1
                    forecastDirection = Math.random()
                    if(forecastDirection<0.5 && gameData.forecast+forecastChange<1.0){
                        gameData.forecast += forecastChange
                    }
                    else if(forecastDirection>=0.5 && gameData.forecast-forecastChange>0.0){
                        gameData.forecast -= forecastChange
                    }
                }
            }
            else if(!gameData.game_over){
                menuList.fishing = 'closed'
                gameData.fish_caught = 0
            }
            break

        case 'i':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                && !gameData.game_over
                && !gameData.game_win){
                if(player.position.x > 0){
                    occupied = grid[player.position.x-1][player.position.y].occupied
                }
                if(player.position.x < grid.length-1 && occupied=='None'){
                    occupied = grid[player.position.x+1][player.position.y].occupied
                }
                if(player.position.y > 0  && occupied=='None'){
                    occupied = grid[player.position.x][player.position.y-1].occupied
                }
                if(player.position.y < grid[0].length-1  && occupied=='None'){
                    occupied = grid[player.position.x][player.position.y+1].occupied
                }
                switch(occupied){
                    case 'shop':
                        menuList.shop='open'
                        break
                    case 'home':
                        menuList.home='open'
                        break
                    case 'help':
                        menuList.help='open'
                        break
                    case 'mechanic':
                        menuList.mechanic='open'
                        break
                    case 'plane':
                        if(gameData.plane_parts == 5){
                            gameData.game_win = true
                            for(row_index in grid){
                                row = grid[row_index]
                                for(cell_index in row){
                                    cell = row[cell_index]
                                    if(cell.occupied == 'plane'){
                                        grid[row_index][cell_index].occupied = 'None'

                                    }
                                }
                            }
                        }
                        break
                }
            }
            else{
                menuList.shop = 'closed'
                menuList.home = 'closed'
                menuList.help = 'closed'
                menuList.mechanic = 'closed'
            }
            // look into getting a camera
            break
        case 'j': //sell fish
            if(menuList.shop == 'open'){
                if(gameData.fish > 0){
                    gameData.money += 5
                    gameData.fish -= 1
                    
                }
            }
            break
        case 'k': //buy fish
            if(menuList.shop == 'open'){
                if(gameData.money >= 8){
                    // red speedboat comes in fast (random event)
                    gameData.money -= 8
                    gameData.fish += 1
                }
            }
            break
        case 'n': 
            if(menuList.mechanic == 'open'){
                repairHullPrice = 20
                repairHullAmnt=10
                if(gameData.money >= repairHullPrice && gameData.hull+repairHullAmnt<=100){
                    gameData.hull += repairHullAmnt
                    gameData.money -= repairHullPrice
                }
                else if(gameData.hull+repairHullAmnt>100){
                    gameData.money -= repairHullPrice*(100-gameData.hull)/repairHullAmnt
                    gameData.hull += repairHullAmnt*(100-gameData.hull)/repairHullAmnt
                }
            }
            break
        case 'p': 
            if(menuList.mechanic == 'open'){
                planePartPrice = 50
                if(gameData.money >= planePartPrice && gameData.plane_parts<5){
                    gameData.plane_parts += 1
                    gameData.money -= planePartPrice
                }
            }
            break
        case 'x':
            if(menuList.home == 'open'){
                if(gameData.fish > 0 &&gameData.hunger>=5){
                    gameData.hunger -= 5
                    gameData.fish -= 1
                }
            }
            break
        case 'z':
            if(menuList.home == 'open'){
                if(gameData.time == 23){
                    gameData.time = 0
                    gameData.day += 1
                }
                else{gameData.time += 1}
                if(gameData.hunger+3 >= 100){
                    gameData.hunger = 100
                    gameData.game_over = true
                    menuList.home = 'closed'
                }
                else{
                    gameData.hunger += 3
                }
                if(Math.random() < gameData.forecast){
                    gameData.storm=true
                    gameData.forecast=0.1 
                }
                else{
                    gameData.storm=false
                    forecastChange = Math.random()*0.1
                    forecastDirection = Math.random()
                    if(forecastDirection<0.5 && gameData.forecast+forecastChange<1.0){
                        gameData.forecast += forecastChange
                    }
                    else if(forecastDirection>=0.5 && gameData.forecast-forecastChange>0.0){
                        gameData.forecast -= forecastChange
                    }
                }
            }
            break
        case 'g':
            if(menuList.home == 'open'){
                if(gameData.time == 23){
                    gameData.time = 0
                    gameData.day += 1
                }
                else{gameData.time += 1}
                if(gameData.hunger+5 >= 100){
                    gameData.hunger = 100
                    gameData.game_over = true
                    menuList.home = 'closed'
                }
                else{
                    gameData.hunger += 5
                }
                if(Math.random() < 0.3){
                    gameData.forecast -= 0.01
                }
                break
            }

        case 'r':
            if(menuList.fishing == 'closed' 
                && menuList.shop == 'closed'
                && menuList.home == 'closed'
                && menuList.help == 'closed'
                && menuList.mechanic == 'closed'
                ){
                gameData = {
                    day:1,
                    time:8,
                    hunger:0,
                    hull:100,
                    fish:0,
                    money:0,
                    forecast:0.1,
                    fish_caught:0,
                    plane_parts:0,
                    storm:false,
                    game_over:false,
                    game_start:false,

                }
                
                grid[player.position.x][player.position.y].occupied = 'None'
                player.position.x=6
                player.position.y=3
                player.orientation='horizontal'
                break
            }

    }
    grid[player.position.x][player.position.y].occupied = 'player'
})

