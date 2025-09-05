canvas = document.getElementById("fishing_game")
canvas.width = 400
canvas.height = 400

c = canvas.getContext('2d')
gameState = 'menu'
gameHasBeenStartedBefore = false

class Sprite {
    constructor({position, size, velocity, color, opacity, type}){
        this.size = size
        this.position = position
        this.velocity = velocity
        this.color = color
        this.opacity = opacity
        this.type = type
    }
    draw(){
        c.globalAlpha=this.opacity
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.size.x,this.size.y)
        c.globalAlpha=1.0
    }
    update(){
        if(this.position.x + this.velocity.x < 0){
            this.position.x = 0
        }
        else if(this.position.x+this.size.x + this.velocity.x > canvas.width){
            this.position.x = canvas.width - this.size.x
        }
        else{

            this.position.x += this.velocity.x
        }

        if(this.position.y + this.velocity.y < 0){
            this.position.y = 0
        }
        else if(this.position.y+this.size.y + this.velocity.y > canvas.height){
            this.position.y = canvas.height - this.size.y
        }
        else{
            this.position.y += this.velocity.y
        }
        
        this.draw()
    }
}

const boat = new Sprite({
    position:{
        x:200,
        y:200
    },
    size: {
        x: 30,
        y: 30
    },
    velocity:{
        x: 0,
        y: 0
    },
    color:'orange',
    opacity:1.0,
    type:'boat'
})

step()
function step(){
    if(gameState == 'menu'){
        c.clearRect(0,0,canvas.width, canvas.height)
        c.fillStyle = 'blue'
        c.fillRect(0,0,canvas.width, canvas.height)
        c.fillStyle = 'cornflowerblue'
        c.fillRect(25,50,canvas.width-50, canvas.height-90)
        c.fillStyle = 'white'
        c.font = "bold 30px Arial"
        c.fillText('GO FISH!', 130, 100);
        c.font = "bold 22px Arial"
        c.fillText('How to play', 130, 100+40);
        c.font = "bold 20px Arial"
        c.fillText('- Use WASD to move your boat', 50, 180);
        c.fillText('- Press "c" over a splash', 50, 220);
        c.fillText('to try to catch a fish', 62, 245);
        c.fillText('- Meet your fish quota before', 50, 280);
        c.fillText('the time runs out to win', 62, 305);
        c.fillText('Click to start!', 120, 340);
        fishCount = 0
        timeLeft = 20
        spriteList = []
        spriteList.push(boat)
    }
    else if(gameState == 'play'){
        c.fillStyle='blue'
        c.fillRect(0,0,canvas.width,canvas.height)
        for (let i = 0, len = spriteList.length; i < len; i++) {
            if(spriteList[i].type == 'spot' ){
                if(spriteList[i].opacity > 0.5){
                    spriteList[i].opacity -= 2e-3
                }
                else{
                    spriteList[i].opacity = 0.0
                }
                spriteList[i].update()
            }
        }
        for (let i = 0, len = spriteList.length; i < len; i++) {
            if(spriteList[i].type == 'boat'){
                spriteList[i].update()
            }
        }
        c.fillStyle = 'white'
        c.font = "bold 20px Arial"
        c.fillText('Fish Count: '+fishCount+' / 10', 30, 20);
        c.fillText('Time: '+timeLeft, 270, 20);
    }
    else if(gameState == 'lose'){
        c.fillStyle='blue'
        c.fillRect(0,0,canvas.width,canvas.height)

        c.fillStyle = 'white'
        c.font = "bold 25px Arial"
        c.fillText('You ran out of time!', 85, 150);
        c.font = "bold 20px Arial"
        c.fillText("It's okay, you can try again!", 70, 200);
        c.fillText("Click to return to the main menu.", 50, 250);
    }
    else if(gameState == 'win'){
        c.fillStyle='blue'
        c.fillRect(0,0,canvas.width,canvas.height)

        c.fillStyle = 'white'
        c.font = "bold 25px Arial"
        c.fillText('You win!', 150, 190);
        c.font = "bold 20px Arial"
        c.fillText("Click to return to the main menu.", 50, 240);
    }
    window.requestAnimationFrame(step)
}
document.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key){
        case 'w':
            boat.velocity.y = -2
            break
        case 'a':
            boat.velocity.x = -2
            break
        case 's':
            boat.velocity.y = 2
            break
        case 'd':
            boat.velocity.x = 2
            break
        case 'p':
            for (let i = 0, len = spriteList.length; i < len; i++) {
                if(boat.position.x+boat.size.x > spriteList[i].position.x &&
                    boat.position.x < spriteList[i].position.x+spriteList[i].size.x &&
                    boat.position.y+boat.size.y > spriteList[i].position.y &&
                    boat.position.y < spriteList[i].position.y+spriteList[i].size.y ){
                    if(spriteList[i].type == 'spot' && spriteList[i].opacity > 0.5){
                        fishCount += 1
                        spriteList[i].opacity = 0
                    }
                }

            }
        
    }
}
)
document.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch(event.key){
        case 'w':
            boat.velocity.y = 0
            break
        case 'a':
            boat.velocity.x = 0
            break
        case 's':
            boat.velocity.y = 0
            break
        case 'd':
            boat.velocity.x = 0
            break
    }
})

document.addEventListener('click', (event) => {
    if(gameState == 'menu'){
        gameState = 'play'
        if(!gameHasBeenStartedBefore){
            setInterval(function () {
                const spot = new Sprite({
                    position:{
                        x:Math.random()*(canvas.width-50),
                        y:Math.random()*(canvas.height-50)
                    },
                    size: {
                        x: 20,
                        y: 20
                    },
                    velocity:{
                        x: 0,
                        y: 0
                    },
                    color:'cornflowerblue',
                    opacity:1.0,
                    type:'spot'
                })
                spriteList.push(spot)
            }, 1000)
            setInterval(function () {
                timeLeft -= 1
                if(gameState == 'play'){
                    if(fishCount >= 10){
                        gameState = 'win'
                    }
                    if(timeLeft == 0){
                        gameState = 'lose'
                    }
                }
            }, 1000)
            gameHasBeenStartedBefore = true
        }
    }
    else if(gameState == 'lose' || gameState == 'win'){
        gameState = 'menu'
    }
})

