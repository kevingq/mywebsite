canvas = document.getElementById("pong")
canvas.width = 512
canvas.height = 512
const c = canvas.getContext('2d')
gameStarted = false

class Sprite {
    constructor({size, position, velocity, color}){
        this.size = size
        this.position = position
        this.velocity = velocity
        this.color = color
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 
            this.size.x, this.size.y)
    }
    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

paddleWidth = 20
paddleHeight = 70
ballWidth=20
ballHeight=20
ballVelocityX = 1
ballVelocityY = 3
player1Score = 0
player2Score = 0



const player1 = new Sprite({
    size:{
        x: 20,
        y: 70
    },
    position:{
        x: 20,
        y: canvas.height/2-paddleHeight/2
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'red'
})

const player2 = new Sprite({
    size:{
        x: 20,
        y: 70
    },
    position:{
        x: canvas.width-40,
        y: canvas.height/2-paddleHeight/2
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'blue'
})

const ball = new Sprite({
    size:{
        x: ballWidth,
        y: ballHeight
    },
    position:{
        x: canvas.width/2-ballWidth/2,
        y: canvas.height/2-ballHeight/2
    },
    velocity:{
        x: ballVelocityX,
        y: ballVelocityY
    },
    color: 'green'
})

c.fillStyle = 'black'
c.fillRect(0,0,canvas.width, canvas.height)

player1.draw()
player2.draw()
ball.draw()

requestAnimationFrame(animate)
function animate(timestamp){
    c.clearRect(0,0,canvas.width,canvas.height)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    c.fillStyle = 'white'
    c.font = "bold 50px Arial"
    c.fillText(player1Score, 150, 80);
    c.fillText(player2Score, canvas.width-180, 80);

    if(gameStarted){
        if(ball.position.y + ball.size.y + ball.velocity.y >= canvas.height ||
        ball.position.y + ball.velocity.y <= 0 ){
            ball.velocity.y = -ball.velocity.y
        }

        if(ball.position.y + ball.velocity.y <= player2.position.y + player2.size.y + player2.velocity.y &&
            ball.position.y + ball.size.y + ball.velocity.y >= player2.position.y + player2.velocity.y &&
            ball.position.x + ball.size.x + ball.velocity.x >= player2.position.x &&
            ball.position.x + ball.velocity.x <= player2.position.x + player2.size.x){
            if(ball.position.y >= player2.position.y + player2.size.y ||
                ball.position.y + ball.size.y <= player2.position.y){
                    ball.velocity.y = -ball.velocity.y
            }
            if(ball.position.x + ball.size.x <= player2.position.x ||
                ball.position.x >= player2.position.x + player2.size.x){
                ball.velocity.x = -ball.velocity.x
            }
            
        }

        if(ball.position.y + ball.velocity.y <= player1.position.y + player1.size.y + player1.velocity.y &&
            ball.position.y + ball.size.y + ball.velocity.y >= player1.position.y + player1.velocity.y &&
            ball.position.x + ball.size.x + ball.velocity.x >= player1.position.x &&
            ball.position.x + ball.velocity.x <= player1.position.x + player1.size.x){
            if(ball.position.y >= player1.position.y + player1.size.y ||
                ball.position.y + ball.size.y <= player1.position.y){
                    ball.velocity.y = -ball.velocity.y
            }
            if(ball.position.x + ball.size.x <= player1.position.x ||
                ball.position.x >= player1.position.x + player1.size.x){
                ball.velocity.x = -ball.velocity.x
            }
        }

        if(ball.velocity.y < 0){
            player2.velocity.y = ball.velocity.y + 1
        }
        else{
            player2.velocity.y = ball.velocity.y - 1
        }
        if(player2.position.y + player2.size.y + player2.velocity.y > canvas.height){
            player2.position.y = canvas.height - player2.size.y
        }
        if(player2.position.y + player2.velocity.y < 0){
            player2.position.y = 0
        }

        if(player1.position.y + player1.size.y + player1.velocity.y > canvas.height){
            player1.position.y = canvas.height - player1.size.y
        }
        if(player1.position.y + player1.velocity.y < 0){
            player1.position.y = 0
        }
        player1.update()
        player2.update()
        ball.update()
    }
    
    else{
        player1.draw()
        player2.draw()
        ball.draw()

        c.fillStyle = 'white'
        c.font = "bold underline 60px Arial"
        c.fillText("PONG",180,200)

        c.font = "bold 30px Arial"
        c.fillText("Click to start",160,310)
        c.fillText("then click to move",130,360)
    }

    if(ball.position.x < 0 || ball.position.x > canvas.width){
        if(ball.position.x < 0){
            player2Score += 1
        }
        if(ball.position.x > canvas.width){
            player1Score += 1
        }
        player1.position.x = 20
        player1.position.y = canvas.height/2 - player1.size.y/2
        player1.velocity.y = 0

        player2.position.x = canvas.width - 40
        player2.position.y = canvas.height/2 - player2.size.y/2
        player2.velocity.y = 0

        ball.position.x = canvas.width/2 - ball.size.x/2
        ball.position.y = canvas.height/2 - ball.size.y/2
        ball.velocity.x = 0
        ball.velocity.y = 0
        gameStarted = false

        console.log(player1Score + ' ' + player2Score)
    }

    requestAnimationFrame(animate)

}

window.addEventListener('click', (event) => {
    if(!gameStarted){
        gameStarted = true
        ball.velocity.x = ballVelocityX
        ball.velocity.y = ballVelocityY
    }
    else{
        if(player1.velocity.y == 0){
            player1.velocity.y = ballVelocityY-1
        }
        else{
            player1.velocity.y = -player1.velocity.y
        }
    }
})
