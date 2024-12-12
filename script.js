let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function criarBG(){
    context.fillStyle = '#7AC74F'
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha(){
    for(cont = 0; cont < snake.length; cont++){
        context.fillStyle = '#002E2C'
        context.fillRect(snake[cont].x, snake[cont].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = '#DE1A1A'
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)
function update(event){
    if(event.keyCode == 37 && direction != "right"){
        direction = "left"
    }else if(event.keyCode == 38 && direction != "up"){
        direction = "down"
    }else if(event.keyCode == 39 && direction != "left"){
        direction = "right"
    }else if(event.keyCode == 40 && direction != "down"){
        direction = "up"
    }
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0
    }else if(snake[0].x < 0 && direction == "left"){
        snake[0].x = 16 * box
    }else if(snake[0].y > 15 * box && direction == "up"){
        snake[0].y = 0
    }else if(snake[0].y < 0 && direction == "down"){
        snake[0].y = 16 * box
    }

    for(cont = 1; cont < snake.length; cont++){
        if(snake[0].x == snake[cont].x && snake[0].y == snake[cont].y){
            clearInterval(jogo)
            alert("Game Over")
        }
    }

    criarBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if(direction == "right"){
        snakeX += box
    }else if(direction == "left"){
        snakeX -= box
    }else if(direction == "up"){
        snakeY += box
    }else if(direction == "down"){
        snakeY -= box
    }

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)

}

let jogo = setInterval(iniciarJogo, 100)

