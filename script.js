const board = document.getElementById("game-board");
const scoreLabel = document.getElementById("score");
const startButton = document.getElementById("start-button");
let score = 0;
let isPlaying = false;
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = "right";

function updateScore() {
	scoreLabel.innerHTML = `分数：${score}`;
}

function createFood() {
	food.x = Math.floor(Math.random() * 20) * 20;
	food.y = Math.floor(Math.random() * 20) * 20;
	const newFood = document.createElement("div");
	newFood.classList.add("food");
	newFood.style.left = `${food.x}px`;
	newFood.style.top = `${food.y}px`;
	board.appendChild(newFood);
}

function createSnake() {
	for (let i = 0; i < snake.length; i++) {
		const newSnakePart = document.createElement("div");
		newSnakePart.classList.add("snake");
		newSnakePart.style.left = `${snake[i].x}px`;
		newSnakePart.style.top = `${snake[i].y}px`;
		board.appendChild(newSnakePart);
	}
}

function updateSnake() {
	const newHead = { x: snake[0].x, y: snake[0].y };
	switch (direction) {
		case "up":
			newHead.y -= 20;
			break;
		case "down":
			newHead.y += 20;
			break;
		case "left":
			newHead.x -= 20;
			break;
		case "right":
			newHead.x += 20;
			break;
	}
	snake.unshift(newHead);
	if (newHead.x === food.x && newHead.y === food.y) {
		score++;
		updateScore();
		board.removeChild(board.lastChild);
		createFood();
	    else {
		board.removeChild(board.lastChild);
	}
	for (let i = 1; i < snake.length; i++) {
		if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
			gameOver();
			return;
		}
	}
	board.removeChild(board.firstChild);
	const newSnakePart = document.createElement("div");
	newSnakePart.classList.add("snake");
	newSnakePart.style.left = `${newHead.x}px`;
	newSnakePart.style.top = `${newHead.y}px`;
	board.appendChild(newSnakePart);
	snake.pop();
}

function gameOver() {
	isPlaying = false;
	alert(`游戏结束，得分：${score}`);
	snake = [{ x: 0, y: 0 }];
	board.innerHTML = "";
	updateScore();
}

function startGame() {
	if (isPlaying) {
		return;
	}
	isPlaying = true;
	score = 0;
	updateScore();
	createFood();
	createSnake();
	const gameLoop = setInterval(() => {
		updateSnake();
	}, 100);
}

startButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowUp":
			if (direction !== "down") {
				direction = "up";
			}
			break;
		case "ArrowDown":
			if (direction !== "up") {
				direction = "down";
			}
			break;
		case "ArrowLeft":
			if (direction !== "right") {
				direction = "left";
			}
			break;
		case "ArrowRight":
			if (direction !== "left") {
				direction = "right";
			}
			break;
	}
});

